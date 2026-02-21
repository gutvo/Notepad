import actions from "@Actions";
import BaseBottomModal from "@Components/bases/BottomModal";
import BaseIcon from "@Components/bases/Icon";
import ReminderModal from "@Components/modals/ReminderModal";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useModal from "@Hooks/useModal";
import useNavigation from "@Hooks/useNavigation";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import locales from "@Locales";
import { Dispatch, SetStateAction } from "react";
import CustomListItem, { CustomItemProps } from "./CustomListItem";

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
  const { openModal } = useModal();

  const { isOpen } = useCurrentModal("REMINDER");

  function handleVisualizeNote() {
    if (!selectedNote) return;

    navigation.navigate({
      pathname: "/home/detail",
      params: { id: selectedNote.id },
    });
    setSelectedNote(null);
    handleCloseModal();
  }

  async function handleDeleteNote() {
    if (!selectedNote) return;

    await actions.note.delete(selectedNote.id);

    setSelectedNote(null);
    handleCloseModal();

    toast.success(locales.home.list.actionModal.success.delete);
  }

  async function handleDuplicateNote() {
    if (!selectedNote) return;

    await actions.note.create({ description: selectedNote.description });

    setSelectedNote(null);
    handleCloseModal();

    toast.success(locales.home.list.actionModal.success.duplicate);
  }

  async function handleAddReminder() {
    if (!selectedNote) return;

    openModal("REMINDER", { noteId: selectedNote.id });
  }

  const options: CustomItemProps[] = [
    {
      name: locales.home.list.actionModal.actions.view,
      onClick: handleVisualizeNote,
      Icon: <BaseIcon name="eye-outline" />,
    },
    {
      name: locales.home.list.actionModal.actions.duplicate,
      onClick: handleDuplicateNote,
      Icon: <BaseIcon name="content-copy" />,
    },
    {
      name: locales.home.list.actionModal.actions.reminder,
      onClick: handleAddReminder,
      Icon: <BaseIcon name="bell-plus-outline" />,
    },
    {
      name: locales.home.list.actionModal.actions.delete,
      onClick: handleDeleteNote,
      Icon: <BaseIcon name="trash-can-outline" />,
    },
  ];

  return (
    <BaseBottomModal.Modal
      isOpen={isOpenModal}
      title={locales.home.list.actionModal.title}
      onClose={handleCloseModal}
    >
      <BaseBottomModal.FlatList
        data={options}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <CustomListItem item={item} />}
        contentContainerStyle={{ paddingVertical: theme.spacing(3) }}
      />

      {isOpen && <ReminderModal />}
    </BaseBottomModal.Modal>
  );
}
