import database from "@Database";
import { dataEvents } from "@Lib/dataEvents";
import { reminderSchema } from "@Schemas";
import { eq, inArray } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

interface DeleteReminderOptionsProps {
  transaction?: ExpoSQLiteDatabase;
}

export default async function deleteReminder(
  id: number | number[],
  options?: DeleteReminderOptionsProps,
) {
  const finalDatabase = options?.transaction || database;

  if (Array.isArray(id)) {
    if (id.length > 0) {
      await finalDatabase
        .delete(reminderSchema)
        .where(inArray(reminderSchema.id, id));
    }
  } else {
    await finalDatabase.delete(reminderSchema).where(eq(reminderSchema.id, id));
  }

  dataEvents.emit();
}
