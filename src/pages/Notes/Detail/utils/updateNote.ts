import actions from "@Actions";
import { FormatMessageProps } from "@Hooks/useLocale";

interface UpdateNoteProps {
  description: string;
  toast: ToastContextProps;
  id: number;
  formatMessage: FormatMessageProps;
}

export default async function updateNote({
  description,
  toast,
  id,
  formatMessage,
}: UpdateNoteProps) {
  const data = { description };

  const updatedNote = await actions.note.update(id, data);

  toast.success(formatMessage({ id: "messages.success.update-note" }));

  return updatedNote;
}
