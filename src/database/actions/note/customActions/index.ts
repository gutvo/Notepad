import { noteSchema } from "@Schemas";
import { EntityActionsProps } from "../../createActions";
import moveToTrash from "./moveToTrash";
import restore from "./restore";

type NoteActions = EntityActionsProps<typeof noteSchema>;

export default function customActions(actions: NoteActions) {
  return {
    moveToTrash: (id: number) => moveToTrash(actions, id),
    restore: (id: number) => restore(actions, id),
  };
}
