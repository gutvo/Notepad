import { noteSchema } from "@Schemas";
import reminderActions from "../../reminder";
import database from "@Database";
import { EntityActionsProps } from "../../createActions";
import { cancelScheduledNotifications } from "@Utils/notificationHelpers";

async function moveNoteAndRemindersToTrash(
  noteActions: EntityActionsProps<typeof noteSchema>,
  noteId: number,
) {
  const reminders = await reminderActions.list({
    note_id: noteId,
    deleted_at: { isNull: true },
  });
  const reminderIds = reminders.map((reminder) => reminder.id);

  await cancelScheduledNotifications(
    reminders.map((reminder) => reminder.notification_id),
  );

  const deletedAt = new Date();
  await database.transaction(async (transaction) => {
    await noteActions.update(
      noteId,
      { deleted_at: deletedAt },
      { transaction },
    );

    if (reminderIds.length) {
      await reminderActions.update(
        reminderIds,
        { deleted_at: deletedAt },
        { transaction },
      );
    }
  });

  if (reminderIds.length) {
    reminderActions.notifyChange("UPDATED", reminderIds);
  }
  noteActions.notifyChange("UPDATED", [noteId]);

  return noteActions.find(noteId);
}

export default function moveToTrash(
  actions: EntityActionsProps<typeof noteSchema>,
  id: number,
) {
  return moveNoteAndRemindersToTrash(actions, id);
}
