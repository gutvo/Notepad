import database from "@Database";
import { reminderSchema } from "@Schemas";
import { eq } from "drizzle-orm";
import { ReminderRowProps } from "..";

export default function getChildren(reminder: ReminderRowProps) {
  return database
    .select()
    .from(reminderSchema)
    .where(eq(reminderSchema.parent_id, reminder.id));
}
