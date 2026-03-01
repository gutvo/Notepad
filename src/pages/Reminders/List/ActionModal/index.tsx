import BaseBottomModal from "@Components/bases/BottomModal";
import BaseIcon from "@Components/bases/Icon";
import BaseListItemButton, {
  BaseListItemButtonProps,
} from "@Components/bases/ListItemButton";
import ReminderModal from "@Components/modals/ReminderModal";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useLocale from "@Hooks/useLocale";
import useModal from "@Hooks/useModal";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import deleteNotification from "@Utils/deleteNotification";
import { Dispatch, SetStateAction, useState } from "react";

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
  const { formatMessage } = useLocale();

  const { isOpen } = useCurrentModal("REMINDER");
  const { openModal } = useModal();

  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

    try {
      await deleteNotification({ reminderId: selectedReminder.id });

      setSelectedReminder(null);
      handleCloseModal();

      toast.success(formatMessage({ id: "messages.success.delete-reminder" }));
    } catch {
      toast.success(formatMessage({ id: "messages.failure.delete-reminder" }));
    } finally {
      setIsLoading(false);
    }
  }

  const options: BaseListItemButtonProps[] = [
    {
      label: formatMessage({ id: "modals.reminder-actions.action.update" }),
      onPress: handleUpdateReminder,
      Left: <BaseIcon name="pencil-outline" />,
      disabled: isLoading,
    },
    {
      label: formatMessage({ id: "modals.reminder-actions.action.delete" }),
      onPress: handleDeleteNote,
      Left: <BaseIcon name="trash-can-outline" />,
    },
  ];

  return (
    <BaseBottomModal.Modal
      isOpen={isOpenModal}
      title={formatMessage({ id: "modals.reminder-actions.title" })}
      onClose={handleCloseModal}
    >
      <BaseBottomModal.FlatList
        data={options}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => <BaseListItemButton {...item} />}
        contentContainerStyle={{ paddingVertical: theme.spacing(3) }}
      />

      {isOpen && <ReminderModal />}
    </BaseBottomModal.Modal>
  );
}
