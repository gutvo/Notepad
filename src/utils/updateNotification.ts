import actions from "@Actions";
import database from "@Database";
import {
  buildNotificationContent,
  cancelScheduledNotifications,
  getReminderTitle,
  scheduleReminderNotification,
} from "./notificationHelpers";

export interface UpdateNotificationProps {
  reminderId: number;
  title?: string;
  date: Date;
  daysBefore: number;
}

export default async function updateNotification({
  reminderId,
  title,
  date,
  daysBefore,
}: UpdateNotificationProps) {
  const days = Math.max(0, daysBefore);

  const changedReminderIds = await database.transaction(async (transaction) => {
    const parentReminder = await actions.reminder.find(reminderId);
    if (!parentReminder) throw new Error("Reminder não encontrado");

    const note = await actions.note.find(parentReminder.note_id);
    if (!note) throw new Error("Nota não encontrada");

    const childrenReminders = await parentReminder.getChildren();
    const shortTitle = getReminderTitle(title, note.description);

    await cancelScheduledNotifications([
      parentReminder.notification_id,
      ...childrenReminders.map((child) => child.notification_id),
    ]);

    const mainContent = buildNotificationContent(shortTitle, date, null);
    const newMainNotificationId = await scheduleReminderNotification(
      date,
      note.id,
      mainContent.title,
      mainContent.body,
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
      const subNotificationId = await scheduleReminderNotification(
        subDate,
        note.id,
        subContent.title,
        subContent.body,
      );

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

    if (batchUpdates.length) {
      await actions.reminder.updateBatch(batchUpdates, { transaction });
    }

    const extraChildren = childrenReminders.filter(
      (child) => !usedChildrenIds.includes(child.id),
    );

    if (extraChildren.length) {
      await actions.reminder.delete(
        extraChildren.map((child) => child.id),
        {
          transaction,
        },
      );
    }

    return [
      parentReminder.id,
      ...childrenReminders.map((child) => child.id),
      ...usedChildrenIds,
    ];
  });

  actions.reminder.notifyChange("UPDATED", [...new Set(changedReminderIds)]);
}
