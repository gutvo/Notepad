import database from "@Database";
import { noteSchema } from "@Schemas";
import { desc, like } from "drizzle-orm";

interface ListNotesProps {
  search?: string;
}

export default async function listNotes({ search }: ListNotesProps = {}) {
  return database
    .select()
    .from(noteSchema)
    .where(search ? like(noteSchema.description, `%${search}%`) : undefined)
    .orderBy(desc(noteSchema.created_at));
}
