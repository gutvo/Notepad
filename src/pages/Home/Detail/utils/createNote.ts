import actions from "@Actions";

interface CreateNoteProps {
  description: string;
  toast: ToastContextProps;
}

export default async function createNote({
  description,
  toast,
}: CreateNoteProps) {
  if (!description) return;

  const data = { description };

  const createdNote = await actions.note.create(data);

  toast.success("Nota criada com sucesso!");

  return createdNote;
}
