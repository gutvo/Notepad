import database from "@Database";
import { noteSchema } from "@Schemas";
import { desc } from "drizzle-orm";

export default async function listNotes() {
  return database
    .select()
    .from(noteSchema)
    .orderBy(desc(noteSchema.created_at));
}
