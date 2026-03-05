import database from "@Database";
import { reminderSchema } from "@Schemas";
import { and, between, desc, eq, gt, isNull, like, lt, SQL } from "drizzle-orm";

interface ListRemindersProps {
  search?: string;
  noteId?: number;
  parentId?: number | null;
  lowerThan?: Date; // menor que
  greaterThan?: Date; // maior que
}

export default async function listReminders({
  search,
  noteId,
  parentId,
  greaterThan,
  lowerThan,
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

  if (greaterThan && lowerThan) {
    whereMatch.push(
      between(reminderSchema.notificate_at, greaterThan, lowerThan),
    );
  } else if (greaterThan) {
    whereMatch.push(gt(reminderSchema.notificate_at, greaterThan));
  } else if (lowerThan) {
    whereMatch.push(lt(reminderSchema.notificate_at, lowerThan));
  }

  return database
    .select()
    .from(reminderSchema)
    .where(whereMatch.length ? and(...whereMatch) : undefined)
    .orderBy(desc(reminderSchema.notificate_at));
}
