import actions from "@Actions";
import database from "@Database";
import * as Notifications from "expo-notifications";
import { Href } from "expo-router";

interface UpdateNotificationProps {
  reminderId: number;
  title?: string;
  date: Date;
  daysBefore: number;
}

const DETAIL_PAGE_URL: Href = "/home/detail";

function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

function getReminderTitle(
  userTitle: string | undefined,
  noteDescription: string,
  maxLength = 50,
) {
  if (userTitle && userTitle.trim()) return userTitle.trim();
  const firstLine = noteDescription.split("\n")[0].trim();
  if (firstLine.length <= maxLength) return firstLine;
  return firstLine.substring(0, maxLength).trim() + "...";
}

function buildNotificationContent(
  shortTitle: string,
  date: Date,
  diffDays: number | null,
) {
  const formattedDate = formatDate(date);

  if (diffDays === null) {
    return {
      title: "Hora de revisar sua nota",
      body: `"${shortTitle}" está agendada para hoje (${formattedDate}).`,
    };
  }

  if (diffDays === 1) {
    return {
      title: "Sua nota é amanhã",
      body: `"${shortTitle}" está programada para amanhã.`,
    };
  }

  return {
    title: "Lembrete programado",
    body: `"${shortTitle}" em ${diffDays} dias (${formattedDate}).`,
  };
}

export default async function updateNotification({
  reminderId,
  title,
  date,
  daysBefore,
}: UpdateNotificationProps) {
  const days = Math.max(0, daysBefore);

  await database.transaction(async (transaction) => {
    const parentReminder = await actions.reminder.find(reminderId);
    if (!parentReminder) throw new Error("Reminder não encontrado");

    const note = await actions.note.find(parentReminder.note_id);
    if (!note) throw new Error("Nota não encontrada");

    const childrenReminders = await parentReminder.getChildren();
    const shortTitle = getReminderTitle(title, note.description);

    // cancelar notificações existentes
    await Notifications.cancelScheduledNotificationAsync(
      parentReminder.notification_id,
    );
    await Promise.all(
      childrenReminders.map((c) =>
        Notifications.cancelScheduledNotificationAsync(c.notification_id),
      ),
    );

    // 🔔 recriar notificação principal
    const mainContent = buildNotificationContent(shortTitle, date, null);
    const newMainNotificationId = await Notifications.scheduleNotificationAsync(
      {
        content: {
          title: mainContent.title,
          body: mainContent.body,
          sound: true,
          data: { url: DETAIL_PAGE_URL, params: { id: note.id } },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date,
        },
      },
    );

    await actions.reminder.update(
      parentReminder.id,
      {
        notification_id: newMainNotificationId,
        title: shortTitle,
        message: mainContent.body,
        notificate_at: date,
      },
      { transaction },
    );

    const usedChildrenIds: number[] = [];
    const batchUpdates: {
      id: number;
      notification_id: string;
      title: string;
      message: string;
      notificate_at: Date;
    }[] = [];

    for (let index = 1; index <= days; index++) {
      const subDate = new Date(date);
      subDate.setDate(subDate.getDate() - index);
      if (subDate <= new Date()) continue;

      const subContent = buildNotificationContent(shortTitle, date, index);
      const subNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: subContent.title,
          body: subContent.body,
          sound: true,
          data: { url: DETAIL_PAGE_URL, params: { id: note.id } },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: subDate,
        },
      });

      const existingChild = childrenReminders[index - 1];
      if (existingChild) {
        batchUpdates.push({
          id: existingChild.id,
          notification_id: subNotificationId,
          title: shortTitle,
          message: subContent.body,
          notificate_at: subDate,
        });
        usedChildrenIds.push(existingChild.id);
      } else {
        const newChild = await actions.reminder.create(
          {
            notification_id: subNotificationId,
            note_id: note.id,
            title: shortTitle,
            message: subContent.body,
            notificate_at: subDate,
            parent_id: parentReminder.id,
          },
          { transaction },
        );
        usedChildrenIds.push(newChild.id);
      }
    }

    // executa todos updates de filhos existentes de uma vez
    if (batchUpdates.length) {
      await actions.reminder.updateBatch(batchUpdates, { transaction });
    }

    // deletar filhos extras
    const extraChildren = childrenReminders.filter(
      (child) => !usedChildrenIds.includes(child.id),
    );
    if (extraChildren.length) {
      await actions.reminder.delete(
        extraChildren.map((c) => c.id),
        { transaction },
      );
    }
  });
}
