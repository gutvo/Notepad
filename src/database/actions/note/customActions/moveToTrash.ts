import { UpdateNoteProps } from "./types";

export default function moveToTrash(update: UpdateNoteProps, id: number) {
  return update(id, { deleted_at: new Date() });
}
