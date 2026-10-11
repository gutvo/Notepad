import { noteSchema } from "@Schemas";
import { EntityActionsProps } from "../../createActions";

export default function moveToTrash(
  actions: EntityActionsProps<typeof noteSchema>,
  id: number,
) {
  return actions.update(id, { deleted_at: new Date() });
}
