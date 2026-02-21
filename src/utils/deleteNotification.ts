import actions from "@Actions";
import database from "@Database";
import * as Notifications from "expo-notifications";

interface DeleteNotificationProps {
  noteId: number;
}

export default async function deleteNotification({
  noteId,
}: DeleteNotificationProps) {
  await database.transaction(async (transaction) => {
    // 1️⃣ Buscar reminders vinculados
    const oldReminders = await actions.reminder.list({ noteId });

    // 2️⃣ Cancelar notificações no sistema
    for (const reminder of oldReminders) {
      await Notifications.cancelScheduledNotificationAsync(
        reminder.notification_id,
      );
    }

    // 3️⃣ Deletar reminders do banco
    await actions.reminder.delete(noteId, { transaction });
  });
}
