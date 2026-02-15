import actions from "@Actions";
import locales from "@Locales";

interface DeleteNoteProps {
  id: number;
  toast: ToastContextProps;
}

export default async function deleteNote({ id, toast }: DeleteNoteProps) {
  await actions.note.delete(id);

  toast.success(locales.home.detail.note.success.delete);
}
