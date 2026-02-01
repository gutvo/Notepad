import database from "@Database";
import { dataEvents } from "@Lib/dataEvents";
import { noteSchema } from "@Schemas";
import { eq } from "drizzle-orm";
import findNote from "./find";

export default async function updateNote(
  id: number,
  data: Partial<NoteDataProps>,
) {
  const updated = await database
    .update(noteSchema)
    .set(data)
    .where(eq(noteSchema.id, id));

  dataEvents.emit();

  const updatedNote = await findNote(updated.lastInsertRowId);

  return updatedNote;
}
