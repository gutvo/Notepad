import actions from "@Actions";
import database from "@Database";
import * as Notifications from "expo-notifications";
import { Href } from "expo-router";

interface CreateNotificationProps {
  title: string;
  body: string;
  date: Date;
  daysBefore: number;
  noteId: number;
}

const DETAIL_PAGE_URL: Href = "/home/detail";

export default async function createNotification({
  title,
  body,
  date,
  daysBefore,
  noteId,
}: CreateNotificationProps) {
  const days = Math.max(0, daysBefore);
  const scheduledNotificationIds: string[] = [];

  try {
    const allCreatedReminderIds = await database.transaction(
      async (transaction) => {
        const createdReminderIds: number[] = [];

        const mainNotificationId =
          await Notifications.scheduleNotificationAsync({
            content: {
              title,
              body,
              sound: true,
              data: { url: DETAIL_PAGE_URL, params: { id: noteId } },
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.DATE,
              date: date,
            },
          });

        scheduledNotificationIds.push(mainNotificationId);

        const mainReminder = await actions.reminder.create(
          {
            notification_id: mainNotificationId,
            note_id: noteId,
            title,
            message: body,
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

          const subNotificationId =
            await Notifications.scheduleNotificationAsync({
              content: {
                title,
                body: `Lembrete antecipado: ${body}`,
                sound: true,
                data: { url: DETAIL_PAGE_URL, params: { id: noteId } },
              },
              trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: subDate,
              },
            });

          scheduledNotificationIds.push(subNotificationId);

          const subReminder = await actions.reminder.create(
            {
              notification_id: subNotificationId,
              note_id: noteId,
              title,
              message: `Lembrete antecipado: ${body}`,
              notificate_at: subDate,
              parent_id: mainReminder.id,
            },
            { transaction },
          );

          createdReminderIds.push(subReminder.id);
        }

        return createdReminderIds;
      },
    );

    return allCreatedReminderIds;
  } catch (error) {
    for (const id of scheduledNotificationIds) {
      await Notifications.cancelScheduledNotificationAsync(id);
    }

    throw error;
  }
}
