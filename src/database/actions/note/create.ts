import database from "@Database";
import { dataEvents } from "@Lib/dataEvents";
import { noteSchema } from "@Schemas";
import findNote from "./find";

export default async function createNote(data: NoteDataProps) {
  const noteData = { ...data, created_at: new Date() };

  const created = await database.insert(noteSchema).values(noteData);

  dataEvents.emit();

  const createdNote = await findNote(created.lastInsertRowId);

  return createdNote;
}
