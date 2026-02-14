import actions from "@Actions";

interface DeleteNoteProps {
  id: number;
  toast: ToastContextProps;
}

export default async function deleteNote({ id, toast }: DeleteNoteProps) {
  await actions.note.delete(id);

  toast.success("Nota deletada com sucesso!");
}
