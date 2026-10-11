import moveToTrash from "./moveToTrash";
import restore from "./restore";
import { UpdateNoteProps } from "./types";

export default function customActions(update: UpdateNoteProps) {
  return {
    moveToTrash: (id: number) => moveToTrash(update, id),
    restore: (id: number) => restore(update, id),
  };
}
