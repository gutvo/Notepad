import database from "@Database";
import { noteSchema } from "@Schemas";
import { eq } from "drizzle-orm";

export default async function findNote(id: number) {
  const [note] = await database
    .select()
    .from(noteSchema)
    .where(eq(noteSchema.id, id));

  return note ?? null;
}
