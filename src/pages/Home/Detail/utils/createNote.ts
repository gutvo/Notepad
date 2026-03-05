import actions from "@Actions";
import { FormatMessageProps } from "@Hooks/useLocale";

interface CreateNoteProps {
  description: string;
  toast: ToastContextProps;
  formatMessage: FormatMessageProps;
}

export default async function createNote({
  description,
  toast,
  formatMessage,
}: CreateNoteProps) {
  const data = { description };

  const createdNote = await actions.note.create(data);

  toast.success(formatMessage({ id: "messages.success.create-note" }));

  return createdNote;
}
