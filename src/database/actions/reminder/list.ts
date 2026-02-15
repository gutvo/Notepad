import database from "@Database";
import { reminderSchema } from "@Schemas";
import { desc } from "drizzle-orm";

export default async function listReminders() {
  return database
    .select()
    .from(reminderSchema)
    .orderBy(desc(reminderSchema.notificate_at));
}
