import actions from "@Actions";
import { NoteDataProps } from "@Actions/note";
import BaseBottomModal from "@Components/bases/BottomModal";
import BaseIcon from "@Components/bases/Icon";
import BaseListItemButton, {
  BaseListItemButtonProps,
} from "@Components/bases/ListItemButton";
import useDialogAlert from "@Hooks/useDialogAlert";
import useLocale from "@Hooks/useLocale";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import deleteNotePermanently from "@Utils/deleteNotePermanently";
import { Dispatch, SetStateAction, useState } from "react";

interface TrashActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNote: NoteDataProps | null;
  setSelectedNote: Dispatch<SetStateAction<NoteDataProps | null>>;
}

export default function TrashActionModal({
  isOpen,
  onClose,
  selectedNote,
  setSelectedNote,
}: TrashActionModalProps) {
  const theme = useTheme();
  const toast = useToast();
  const { formatMessage } = useLocale();
  const { showAlert } = useDialogAlert();
  const [isLoading, setIsLoading] = useState(false);

  async function handleRestore() {
    if (!selectedNote) return;

    setIsLoading(true);
    try {
      await actions.note.restore(selectedNote.id);
      setSelectedNote(null);
      onClose();
      toast.success(formatMessage({ id: "messages.success.restore-note" }));
    } catch {
      toast.error(formatMessage({ id: "messages.failure.restore-note" }));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeletePermanently() {
    if (!selectedNote) return;

    const confirmed = await showAlert({
      title: formatMessage({ id: "pages.trash.confirm-delete.title" }),
      message: formatMessage({ id: "pages.trash.confirm-delete.message" }),
      isDestructive: true,
    });
    if (!confirmed) return;

    setIsLoading(true);
    try {
      await deleteNotePermanently(selectedNote.id);
      setSelectedNote(null);
      onClose();
      toast.success(
        formatMessage({ id: "messages.success.delete-note-permanently" }),
      );
    } catch {
      toast.error(
        formatMessage({ id: "messages.failure.delete-note-permanently" }),
      );
    } finally {
      setIsLoading(false);
    }
  }

  const options: BaseListItemButtonProps[] = [
    {
      label: formatMessage({ id: "pages.trash.actions.restore" }),
      onPress: handleRestore,
      Left: <BaseIcon name="backup-restore" />,
      disabled: isLoading,
    },
    {
      label: formatMessage({ id: "pages.trash.actions.delete-permanently" }),
      onPress: handleDeletePermanently,
      Left: <BaseIcon name="trash-can-outline" />,
      disabled: isLoading,
    },
  ];

  return (
    <BaseBottomModal.Modal
      isOpen={isOpen}
      title={formatMessage({ id: "modals.home-actions.title" })}
      onClose={onClose}
    >
      <BaseBottomModal.FlatList
        data={options}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => <BaseListItemButton {...item} />}
        contentContainerStyle={{ paddingVertical: theme.spacing(3) }}
      />
    </BaseBottomModal.Modal>
  );
}
