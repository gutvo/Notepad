import actions from "@Actions";
import database from "@Database";
import * as Notifications from "expo-notifications";
// import { PageNames } from "../routes";

interface CreateNotificationProps {
  title: string;
  body: string;
  date: Date;
  daysBefore: number;
  noteId: number;
}

// const DETAIL_PAGE_URL: PageNames = "HomeDetail";

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

        // 1️⃣ Cria a notificação principal (do dia)
        const mainNotificationId =
          await Notifications.scheduleNotificationAsync({
            content: {
              title,
              body,
              sound: true,
              data: { url: "home", params: { id: noteId } },
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
              year: date.getFullYear(),
              month: date.getMonth(),
              day: date.getDate(),
              hour: date.getHours() || 9,
              minute: date.getMinutes() || 0,
              repeats: false,
            },
          });

        scheduledNotificationIds.push(mainNotificationId);

        // Salva a notificação principal no banco
        const mainReminder = await actions.reminder.create(
          {
            notification_id: mainNotificationId,
            note_id: noteId,
            title,
            message: body,
            notificate_at: date,
            parent_id: null, // principal
          },
          { transaction },
        );

        createdReminderIds.push(mainReminder.id);

        for (let index = 1; index <= days; index++) {
          const subDate = new Date(date);
          subDate.setDate(subDate.getDate() - index);

          if (subDate <= new Date()) continue; // ignora datas passadas

          const subNotificationId =
            await Notifications.scheduleNotificationAsync({
              content: {
                title,
                body: `Lembrete antecipado: ${body}`,
                sound: true,
              },
              trigger: {
                type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
                year: subDate.getFullYear(),
                month: subDate.getMonth(),
                day: subDate.getDate(),
                hour: subDate.getHours() || 9,
                minute: subDate.getMinutes() || 0,
                repeats: false,
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
              parent_id: mainReminder.id, // vincula à principal
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
    // Se algo deu errado, cancela todas notificações já agendadas
    for (const id of scheduledNotificationIds) {
      await Notifications.cancelScheduledNotificationAsync(id);
    }

    throw error;
  }
}
