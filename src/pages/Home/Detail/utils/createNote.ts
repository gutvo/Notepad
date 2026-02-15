import actions from "@Actions";
import locales from "@Locales";

interface CreateNoteProps {
  description: string;
  toast: ToastContextProps;
}

export default async function createNote({
  description,
  toast,
}: CreateNoteProps) {
  const data = { description };

  const createdNote = await actions.note.create(data);

  toast.success(locales.home.detail.note.success.create);

  return createdNote;
}
