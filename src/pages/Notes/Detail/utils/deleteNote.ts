import actions from "@Actions";
import { FormatMessageProps } from "@Hooks/useLocale";

interface DeleteNoteProps {
  id: number;
  toast: ToastContextProps;
  formatMessage: FormatMessageProps;
}

export default async function deleteNote({
  id,
  toast,
  formatMessage,
}: DeleteNoteProps) {
  await actions.note.moveToTrash(id);

  toast.success(formatMessage({ id: "messages.success.delete-note" }));
}
