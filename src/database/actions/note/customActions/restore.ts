import { UpdateNoteProps } from "./types";

export default function restore(update: UpdateNoteProps, id: number) {
  return update(id, { deleted_at: null });
}
