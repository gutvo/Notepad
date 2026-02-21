import database from "@Database";
import { dataEvents } from "@Lib/dataEvents";
import { reminderSchema } from "@Schemas";
import { eq } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

interface DeleteReminderOptionsProps {
  transaction?: ExpoSQLiteDatabase;
}

export default async function deleteReminder(
  id: number,
  options?: DeleteReminderOptionsProps,
) {
  const finalDatabase = options?.transaction || database;

  await finalDatabase.delete(reminderSchema).where(eq(reminderSchema.id, id));

  dataEvents.emit();
}
