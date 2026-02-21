import database from "@Database";
import { dataEvents } from "@Lib/dataEvents";
import { reminderSchema } from "@Schemas";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import findReminder from "./find";

interface CreateReminderOptionsProps {
  transaction?: ExpoSQLiteDatabase;
}

export default async function createReminder(
  data: CreateReminderDataProps,
  options?: CreateReminderOptionsProps,
) {
  const finalDatabase = options?.transaction || database;

  const created = await finalDatabase.insert(reminderSchema).values(data);

  dataEvents.emit();

  const createdReminder = await findReminder(created.lastInsertRowId);

  if (!createdReminder) {
    throw new Error("Erro ao criar reminder");
  }

  return createdReminder;
}
