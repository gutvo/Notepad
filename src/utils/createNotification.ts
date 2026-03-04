import actions from "@Actions";
import database from "@Database";
import * as Notifications from "expo-notifications";
import { Href } from "expo-router";

interface CreateNotificationProps {
  title: string;
  date: Date;
  daysBefore: number;
  noteId: number;
}

const DETAIL_PAGE_URL: Href = "/home/detail";

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

    const allCreatedReminderIds = await database.transaction(
      async (transaction) => {
        const createdReminderIds: number[] = [];

        // Corpo e título principal
        const mainBody = `Faltam ${days} dias`;
        const formattedTitle = `Lembrete: ${title}`;

        // Notificação principal
        const mainNotificationId =
          await Notifications.scheduleNotificationAsync({
            content: {
              title: formattedTitle,
              body: mainBody,
              sound: true,
              data: { url: DETAIL_PAGE_URL, params: { id: noteId } },
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.DATE,
              date,
            },
          });

        scheduledNotificationIds.push(mainNotificationId);

        const mainReminder = await actions.reminder.create(
          {
            notification_id: mainNotificationId,
            note_id: noteId,
            title,
            message: mainBody,
            notificate_at: date,
            parent_id: null,
          },
          { transaction },
        );

        createdReminderIds.push(mainReminder.id);

        // Notificações antecipadas
        for (let index = 1; index <= days; index++) {
          const subDate = new Date(date);
          subDate.setDate(subDate.getDate() - index);
          if (subDate <= new Date()) continue;

          const subBody = `Faltam ${days - index} dias`;

          const subNotificationId =
            await Notifications.scheduleNotificationAsync({
              content: {
                title: formattedTitle,
                body: subBody,
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
              message: subBody,
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
    // Cancela todas notificações caso dê erro
    for (const id of scheduledNotificationIds) {
      await Notifications.cancelScheduledNotificationAsync(id);
    }
    throw error;
  }
}
