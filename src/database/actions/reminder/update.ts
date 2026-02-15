import database from "@Database";
import { dataEvents } from "@Lib/dataEvents";
import { reminderSchema } from "@Schemas";
import { eq } from "drizzle-orm";
import findReminder from "./find";

interface UpdateReminderOptionsProps {
  transaction?: typeof database;
}

export default async function updateReminder(
  id: number,
  data: UpdateReminderDataProps,
  options?: UpdateReminderOptionsProps,
) {
  const finalDatabase = options?.transaction || database;

  await finalDatabase
    .update(reminderSchema)
    .set(data)
    .where(eq(reminderSchema.id, id));

  dataEvents.emit();

  const updatedReminder = await findReminder(id);

  return updatedReminder;
}
