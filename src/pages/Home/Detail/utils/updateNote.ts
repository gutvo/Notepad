import actions from "@Actions";
import locales from "@Locales";

interface UpdateNoteProps {
  description: string;
  toast: ToastContextProps;
  id: number;
}

export default async function updateNote({
  description,
  toast,
  id,
}: UpdateNoteProps) {
  const data = { description };

  const updatedNote = await actions.note.update(id, data);

  toast.success(locales.home.detail.note.success.update);

  return updatedNote;
}
