import database from "@Database";
import { dataEvents } from "@Lib/dataEvents";
import { noteSchema } from "@Schemas";
import { eq } from "drizzle-orm";

export default async function deleteNote(id: number) {
  await database.delete(noteSchema).where(eq(noteSchema.id, id));

  dataEvents.emit();
}
