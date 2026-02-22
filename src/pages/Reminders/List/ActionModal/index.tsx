import BaseBottomModal from "@Components/bases/BottomModal";
import BaseIcon from "@Components/bases/Icon";
import ReminderModal from "@Components/modals/ReminderModal";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useModal from "@Hooks/useModal";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import locales from "@Locales";
import deleteNotification from "@Utils/deleteNotification";
import { Dispatch, SetStateAction } from "react";
import CustomListItem, { CustomItemProps } from "./CustomListItem";

interface ActionModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  selectedReminder: ReminderDataProps | null;
  setSelectedReminder: Dispatch<SetStateAction<ReminderDataProps | null>>;
}

export default function ActionModal({
  handleCloseModal,
  isOpenModal,
  selectedReminder,
  setSelectedReminder,
}: ActionModalProps) {
  const theme = useTheme();
  const toast = useToast();

  const { isOpen } = useCurrentModal("REMINDER");
  const { openModal } = useModal();

  function handleUpdateReminder() {
    if (!selectedReminder) return;

    openModal("REMINDER", {
      noteId: selectedReminder.note_id,
      id: selectedReminder.id,
    });

    setSelectedReminder(null);
    handleCloseModal();
  }

  async function handleDeleteNote() {
    if (!selectedReminder) return;

    await deleteNotification({ reminderId: selectedReminder.id });

    setSelectedReminder(null);
    handleCloseModal();

    toast.success(locales.home.list.actionModal.success.delete);
  }

  const options: CustomItemProps[] = [
    {
      name: "Atualizar",
      onClick: handleUpdateReminder,
      Icon: <BaseIcon name="pencil-outline" />,
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
