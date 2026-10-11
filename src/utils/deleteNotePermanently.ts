import actions from "@Actions";
import database from "@Database";
import { cancelScheduledNotifications } from "./notificationHelpers";

export default async function deleteNotePermanently(noteId: number) {
  const note = await actions.note.find(noteId);
  if (!note) throw new Error(`Nota ${noteId} não encontrada.`);

  const reminders = await actions.reminder.list({ note_id: noteId });
  const reminderIds = reminders.map((reminder) => reminder.id);

  await cancelScheduledNotifications(
    reminders.map((reminder) => reminder.notification_id),
  );

  await database.transaction(async (transaction) => {
    if (reminderIds.length) {
      await actions.reminder.delete(reminderIds, { transaction });
    }

    await actions.note.delete(noteId, { transaction });
  });

  if (reminderIds.length) {
    actions.reminder.notifyChange("DELETED", reminderIds);
  }
  actions.note.notifyChange("DELETED", [noteId]);
}
