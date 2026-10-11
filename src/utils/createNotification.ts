import actions from "@Actions";
import database from "@Database";
import {
  buildNotificationContent,
  cancelScheduledNotifications,
  getReminderTitle,
  scheduleReminderNotification,
} from "./notificationHelpers";

export interface CreateNotificationProps {
  title?: string;
  date: Date;
  daysBefore: number;
  noteId: number;
}

export default async function createNotification({
  title,
  date,
  daysBefore,
  noteId,
}: CreateNotificationProps) {
  const days = Math.max(0, daysBefore);
  const scheduledNotificationIds: string[] = [];

  try {
    if (date <= new Date()) {
      throw new Error("Data da notificação está no passado");
    }

    let createdReminderIds: number[] = [];

    createdReminderIds = await database.transaction(async (transaction) => {
      const note = await actions.note.find(noteId);
      if (!note) throw new Error("Nota não encontrada");

      const shortTitle = getReminderTitle(title, note.description);
      const mainContent = buildNotificationContent(shortTitle, date, null);
      const mainNotificationId = await scheduleReminderNotification(
        date,
        noteId,
        mainContent.title,
        mainContent.body,
      );

      scheduledNotificationIds.push(mainNotificationId);

      const mainReminder = await actions.reminder.create(
        {
          notification_id: mainNotificationId,
          note_id: noteId,
          title: shortTitle,
          message: mainContent.body,
          notificate_at: date,
          parent_id: null,
        },
        { transaction },
      );

      createdReminderIds.push(mainReminder.id);

      for (let index = 1; index <= days; index++) {
        const subDate = new Date(date);
        subDate.setDate(subDate.getDate() - index);

        if (subDate <= new Date()) continue;

        const subContent = buildNotificationContent(shortTitle, date, index);
        const subNotificationId = await scheduleReminderNotification(
          subDate,
          noteId,
          subContent.title,
          subContent.body,
        );

        scheduledNotificationIds.push(subNotificationId);

        const subReminder = await actions.reminder.create(
          {
            notification_id: subNotificationId,
            note_id: noteId,
            title: shortTitle,
            message: subContent.body,
            notificate_at: subDate,
            parent_id: mainReminder.id,
          },
          { transaction },
        );

        createdReminderIds.push(subReminder.id);
      }

      return createdReminderIds;
    });

    actions.reminder.notifyChange("CREATED", createdReminderIds);
    return createdReminderIds;
  } catch (error) {
    await cancelScheduledNotifications(scheduledNotificationIds);
    throw error;
  }
}
