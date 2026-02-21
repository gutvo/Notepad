import actions from "@Actions";
import database from "@Database";
import * as Notifications from "expo-notifications";

interface DeleteNotificationProps {
  reminderId: number;
}

export default async function deleteNotification({
  reminderId,
}: DeleteNotificationProps) {
  await database.transaction(async (transaction) => {
    // 1️⃣ Buscar reminders vinculados
    const oldReminders = await actions.reminder.find(reminderId);

    if (!oldReminders) return;

    const childrens = await oldReminders.getChildren();

    // 2️⃣ Cancelar notificações no sistema
    for (const reminder of childrens) {
      await Notifications.cancelScheduledNotificationAsync(
        reminder.notification_id,
      );
    }

    await actions.reminder.delete(reminderId);

    // 3️⃣ Deletar reminders do banco
    await actions.reminder.delete(reminderId, { transaction });
  });
}
