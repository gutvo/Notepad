import actions from "@Actions";
import { NoteDataProps } from "@Actions/note";
import BaseBottomModal from "@Components/bases/BottomModal";
import BaseIcon from "@Components/bases/Icon";
import BaseListItemButton, {
  BaseListItemButtonProps,
} from "@Components/bases/ListItemButton";
import useLocale from "@Hooks/useLocale";
import useModal from "@Hooks/useModal";
import useNavigation from "@Hooks/useNavigation";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import { Dispatch, SetStateAction, useState } from "react";

interface ActionModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  selectedNote: NoteDataProps | null;
  setSelectedNote: Dispatch<SetStateAction<NoteDataProps | null>>;
}

export default function ActionModal({
  handleCloseModal,
  isOpenModal,
  selectedNote,
  setSelectedNote,
}: ActionModalProps) {
  const theme = useTheme();
  const toast = useToast();
  const navigation = useNavigation();
  const { formatMessage } = useLocale();
  const { openModal } = useModal();

  const [isLoading, setIsLoading] = useState(false);

  function handleVisualizeNote() {
    if (!selectedNote) return;

    navigation.navigate({
      pathname: "/notes/detail",
      params: { id: selectedNote.id },
    });
    setSelectedNote(null);
    handleCloseModal();
  }

  async function handleDeleteNote() {
    if (!selectedNote) return;

    setIsLoading(true);

    try {
      await actions.note.moveToTrash(selectedNote.id);

      setSelectedNote(null);
      handleCloseModal();

      toast.success(formatMessage({ id: "messages.success.delete-note" }));
    } catch {
      toast.error(formatMessage({ id: "messages.failure.delete-note" }));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDuplicateNote() {
    if (!selectedNote) return;

    const noteToDuplicate = selectedNote;
    setSelectedNote(null);
    handleCloseModal();

    try {
      const duplicatedNote = await actions.note.create({
        description: noteToDuplicate.description,
        created_at: new Date(),
      });

      toast.success(formatMessage({ id: "messages.success.duplicate-note" }));

      navigation.replace({
        pathname: "/notes/detail",
        params: { id: String(duplicatedNote.id) },
      });
    } catch {
      toast.error(formatMessage({ id: "messages.failure.duplicate-note" }));
    }
  }

  async function handleAddReminder() {
    if (!selectedNote) return;

    openModal("REMINDER", { noteId: selectedNote.id });
  }

  const options: BaseListItemButtonProps[] = [
    {
      label: formatMessage({ id: "modals.home-actions.action.view" }),
      onPress: handleVisualizeNote,
      Left: <BaseIcon name="eye-outline" />,
      disabled: isLoading,
    },
    {
      label: formatMessage({ id: "modals.home-actions.action.add-reminder" }),
      onPress: handleAddReminder,
      Left: <BaseIcon name="bell-plus-outline" />,
      disabled: isLoading,
    },
    {
      label: formatMessage({ id: "modals.home-actions.action.duplicate" }),
      onPress: handleDuplicateNote,
      Left: <BaseIcon name="content-copy" />,
      disabled: isLoading,
    },
    {
      label: formatMessage({ id: "modals.home-actions.action.trash" }),
      onPress: handleDeleteNote,
      Left: <BaseIcon name="trash-can-outline" />,
      disabled: isLoading,
    },
  ];

  return (
    <BaseBottomModal.Modal
      isOpen={isOpenModal}
      title={formatMessage({ id: "modals.home-actions.title" })}
      onClose={handleCloseModal}
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
