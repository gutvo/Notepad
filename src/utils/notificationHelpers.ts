import * as Notifications from "expo-notifications";

export const DETAIL_PAGE_URL = "/notes/detail";

export function formatNotificationDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
}

export function getReminderTitle(
  userTitle: string | undefined,
  noteDescription: string,
  maxLength = 50,
) {
  if (userTitle && userTitle.trim()) return userTitle.trim();

  const firstLine = noteDescription.split("\n")[0]?.trim() ?? "";
  if (!firstLine) return "Nova nota";
  if (firstLine.length <= maxLength) return firstLine;

  return `${firstLine.substring(0, maxLength).trim()}...`;
}

export function buildNotificationContent(
  shortTitle: string,
  date: Date,
  diffDays: number | null,
) {
  const formattedDate = formatNotificationDate(date);

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

export async function cancelScheduledNotifications(ids: string[]) {
  await Promise.all(
    ids
      .filter(Boolean)
      .map((notificationId) =>
        Notifications.cancelScheduledNotificationAsync(notificationId),
      ),
  );
}

export function scheduleReminderNotification(
  date: Date,
  noteId: number,
  title: string,
  body: string,
) {
  return Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
      data: {
        url: { pathname: DETAIL_PAGE_URL, params: { id: noteId } },
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date,
    },
  });
}
