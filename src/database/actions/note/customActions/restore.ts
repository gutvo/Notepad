import { noteSchema } from "@Schemas";
import { EntityActionsProps } from "../../createActions";

type NoteActions = EntityActionsProps<typeof noteSchema>;

export default function restore(
  actions: NoteActions,
  id: Parameters<NoteActions["find"]>[0],
) {
  return actions.update(id, { deleted_at: null });
}
