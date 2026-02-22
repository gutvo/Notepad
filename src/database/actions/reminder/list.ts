import database from "@Database";
import { reminderSchema } from "@Schemas";
import { and, desc, eq, isNull, like, SQL } from "drizzle-orm";

interface ListRemindersProps {
  search?: string;
  noteId?: number;
  parentId?: number | null;
}

export default async function listReminders({
  search,
  noteId,
  parentId,
}: ListRemindersProps = {}) {
  const whereMatch: SQL[] = [];

  if (search !== undefined) {
    whereMatch.push(like(reminderSchema.title, `%${search}%`));
  }

  if (noteId !== undefined) {
    whereMatch.push(eq(reminderSchema.note_id, noteId));
  }

  if (parentId !== undefined) {
    if (parentId !== undefined) {
      if (parentId === null) {
        whereMatch.push(isNull(reminderSchema.parent_id));
      } else {
        whereMatch.push(eq(reminderSchema.parent_id, parentId));
      }
    }
  }

  return database
    .select()
    .from(reminderSchema)
    .where(whereMatch.length ? and(...whereMatch) : undefined)
    .orderBy(desc(reminderSchema.notificate_at));
}
