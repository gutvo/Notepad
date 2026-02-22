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
    const parenReminder = await actions.reminder.find(reminderId);

    if (!parenReminder) return;

    const childrenReminders = await parenReminder.getChildren();

    const allReminderIds = [parenReminder.id];

    for (const reminder of childrenReminders) {
      await Notifications.cancelScheduledNotificationAsync(
        reminder.notification_id,
      );

      allReminderIds.push(reminder.id);
    }

    await actions.reminder.delete(allReminderIds, { transaction });
  });
}
