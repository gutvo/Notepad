import database from "@Database";
import { reminderSchema } from "@Schemas";
import { desc, like } from "drizzle-orm";

interface ListRemindersProps {
  search?: string;
}

export default async function listReminders({
  search,
}: ListRemindersProps = {}) {
  return database
    .select()
    .from(reminderSchema)
    .where(search ? like(reminderSchema.title, `%${search}%`) : undefined)
    .orderBy(desc(reminderSchema.notificate_at));
}
