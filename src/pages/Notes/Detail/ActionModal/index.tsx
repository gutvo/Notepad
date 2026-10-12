import actions from "@Actions";
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
import { useState } from "react";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteId?: number;
  getDescription: () => string;
}

export default function ActionModal({
  isOpen,
  onClose,
  noteId,
  getDescription,
}: ActionModalProps) {
  const theme = useTheme();
  const toast = useToast();
  const navigation = useNavigation();
  const { formatMessage } = useLocale();
  const { openModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  function handleAddReminder() {
    if (!noteId) return;

    onClose();
    openModal("REMINDER", { noteId });
  }

  function handleOpenConfig() {
    onClose();
    openModal("CONFIG");
  }

  async function handleDuplicateNote() {
    if (!noteId) return;

    setIsLoading(true);
    try {
      const duplicatedNote = await actions.note.create({
        description: getDescription(),
        created_at: new Date(),
      });
      onClose();
      toast.success(formatMessage({ id: "messages.success.duplicate-note" }));
      navigation.replace({
        pathname: "/notes/detail",
        params: { id: String(duplicatedNote.id) },
      });
    } catch {
      toast.error(formatMessage({ id: "messages.failure.duplicate-note" }));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleMoveToTrash() {
    if (!noteId) return;

    setIsLoading(true);
    try {
      await actions.note.moveToTrash(noteId);
      onClose();
      toast.success(formatMessage({ id: "messages.success.delete-note" }));
      navigation.back();
    } catch {
      toast.error(formatMessage({ id: "messages.failure.delete-note" }));
    } finally {
      setIsLoading(false);
    }
  }

  const options: BaseListItemButtonProps[] = [
    {
      label: formatMessage({ id: "modals.home-actions.action.add-reminder" }),
      onPress: handleAddReminder,
      Left: <BaseIcon name="bell-plus-outline" />,
      disabled: isLoading || !noteId,
    },
    {
      label: formatMessage({ id: "modals.sidebar.option.config" }),
      onPress: handleOpenConfig,
      Left: <BaseIcon name="cog-outline" />,
      disabled: isLoading,
    },
    {
      label: formatMessage({ id: "modals.home-actions.action.duplicate" }),
      onPress: handleDuplicateNote,
      Left: <BaseIcon name="content-copy" />,
      disabled: isLoading || !noteId,
    },
    {
      label: formatMessage({ id: "modals.home-actions.action.trash" }),
      onPress: handleMoveToTrash,
      Left: <BaseIcon name="trash-can-outline" />,
      disabled: isLoading || !noteId,
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
