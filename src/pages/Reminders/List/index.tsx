import actions from "@Actions";
import BaseButton from "@Components/bases/Button";
import BaseFlashList from "@Components/bases/FlashList";
import BaseTypography from "@Components/bases/Typography";
import { useActionList } from "@Hooks/useActionList";
import useModal from "@Hooks/useModal";
import useTheme from "@Hooks/useTheme";
import { useState } from "react";
import ActionModal from "./ActionModal";
import useHeader from "./useHeader";

export default function RemindersList() {
  const theme = useTheme();
  const { search } = useHeader();
  const { openModal } = useModal();

  const { data } = useActionList(actions.reminder.list, {
    search,
    parentId: null,
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedReminder, setSelectedReminder] =
    useState<ReminderDataProps | null>(null);

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  return (
    <>
      <BaseFlashList
        data={data}
        renderItem={({ item }) => (
          <BaseButton
            onPress={() =>
              openModal("REMINDER", { id: item.id, noteId: item.note_id })
            }
            onLongPress={() => {
              setSelectedReminder(item);
              handleOpenModal();
            }}
            style={({ pressed }) => [
              { padding: theme.spacing(4) },
              pressed && {
                backgroundColor: theme.palette.action.pressed,
              },
            ]}
          >
            <BaseTypography>{item.title}</BaseTypography>
          </BaseButton>
        )}
      />

      <ActionModal
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
        selectedReminder={selectedReminder}
        setSelectedReminder={setSelectedReminder}
      />
    </>
  );
}
