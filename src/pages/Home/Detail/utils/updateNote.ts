import actions from "@Actions";

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

  toast.success("Nota atualizada com sucesso!");

  return updatedNote;
}
