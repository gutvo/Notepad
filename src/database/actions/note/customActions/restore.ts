import { noteSchema } from "@Schemas";
import database from "@Database";
import reminderActions from "../../reminder";
import { EntityActionsProps } from "../../createActions";
import {
  buildNotificationContent,
  cancelScheduledNotifications,
  scheduleReminderNotification,
} from "@Utils/notificationHelpers";
import { differenceInCalendarDays } from "date-fns";

type NoteActions = EntityActionsProps<typeof noteSchema>;

export default function restore(
  actions: NoteActions,
  id: Parameters<NoteActions["find"]>[0],
) {
  return restoreNoteAndReminders(actions, id);
}

async function restoreNoteAndReminders(
  noteActions: NoteActions,
  noteId: number,
) {
  const note = await noteActions.find(noteId);
  if (!note) throw new Error(`Nota ${noteId} não encontrada.`);

  const reminders = await reminderActions.list({
    note_id: noteId,
    deleted_at: { isNotNull: true },
  });
  const remindersById = new Map(
    reminders.map((reminder) => [reminder.id, reminder]),
  );
  const rescheduledNotificationIds: string[] = [];
  const reminderUpdates: {
    id: number;
    deleted_at: null;
    notification_id: string;
  }[] = [];

  try {
    for (const reminder of reminders) {
      const shouldReschedule = reminder.notificate_at > new Date();
      const parentReminder = reminder.parent_id
        ? remindersById.get(reminder.parent_id)
        : undefined;
      const notificationContent = buildNotificationContent(
        reminder.title,
        parentReminder?.notificate_at ?? reminder.notificate_at,
        parentReminder
          ? differenceInCalendarDays(
              parentReminder.notificate_at,
              reminder.notificate_at,
            )
          : null,
      );
      const notificationId = shouldReschedule
        ? await scheduleReminderNotification(
            reminder.notificate_at,
            noteId,
            notificationContent.title,
            notificationContent.body,
          )
        : reminder.notification_id;

      if (shouldReschedule) {
        rescheduledNotificationIds.push(notificationId);
      }

      reminderUpdates.push({
        id: reminder.id,
        deleted_at: null,
        notification_id: notificationId,
      });
    }

    await database.transaction(async (transaction) => {
      await noteActions.update(noteId, { deleted_at: null }, { transaction });

      if (reminderUpdates.length) {
        await reminderActions.updateBatch(reminderUpdates, { transaction });
      }
    });
  } catch (error) {
    await cancelScheduledNotifications(rescheduledNotificationIds);
    throw error;
  }

  if (reminders.length) {
    reminderActions.notifyChange(
      "UPDATED",
      reminders.map((reminder) => reminder.id),
    );
  }
  noteActions.notifyChange("UPDATED", [noteId]);

  return noteActions.find(noteId);
}
