import database from "@Database";
import { reminderSchema } from "@Schemas";
import { and, desc, eq, like, SQL } from "drizzle-orm";

interface ListRemindersProps {
  search?: string;
  noteId?: number;
}

export default async function listReminders({
  search,
  noteId,
}: ListRemindersProps = {}) {
  const whereMatch: SQL[] = [];

  if (search) {
    whereMatch.push(like(reminderSchema.title, `%${search}%`));
  }

  if (noteId) {
    whereMatch.push(eq(reminderSchema.note_id, noteId));
  }

  return database
    .select()
    .from(reminderSchema)
    .where(whereMatch.length ? and(...whereMatch) : undefined)
    .orderBy(desc(reminderSchema.notificate_at));
}
