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

function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
}

function buildNotificationContent(
  title: string,
  date: Date,
  diffDays: number | null,
) {
  const formattedDate = formatDate(date);

  if (diffDays === null) {
    return {
      title: "Hora de revisar sua nota",
      body: `"${title}" está agendada para hoje (${formattedDate}).`,
    };
  }

  if (diffDays === 1) {
    return {
      title: "Sua nota é amanhã",
      body: `"${title}" está programada para amanhã.`,
    };
  }

  return {
    title: "Lembrete programado",
    body: `"${title}" em ${diffDays} dias (${formattedDate}).`,
  };
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

    const allCreatedReminderIds = await database.transaction(
      async (transaction) => {
        const createdReminderIds: number[] = [];

        // 🔔 Notificação principal
        const mainContent = buildNotificationContent(title, date, null);

        const mainNotificationId =
          await Notifications.scheduleNotificationAsync({
            content: {
              title: mainContent.title,
              body: mainContent.body,
              sound: true,
              data: {
                url: DETAIL_PAGE_URL,
                params: { id: noteId },
              },
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
            title: mainContent.title,
            message: mainContent.body,
            notificate_at: date,
            parent_id: null,
          },
          { transaction },
        );

        createdReminderIds.push(mainReminder.id);

        // ⏳ Notificações antecipadas
        for (let index = 1; index <= days; index++) {
          const subDate = new Date(date);
          subDate.setDate(subDate.getDate() - index);
          if (subDate <= new Date()) continue;

          const subContent = buildNotificationContent(title, date, index);

          const subNotificationId =
            await Notifications.scheduleNotificationAsync({
              content: {
                title: subContent.title,
                body: subContent.body,
                sound: true,
                data: {
                  url: DETAIL_PAGE_URL,
                  params: { id: noteId },
                },
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
              title: subContent.title,
              message: subContent.body,
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
