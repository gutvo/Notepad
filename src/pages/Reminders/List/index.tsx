import actions from "@Actions";
import BaseFlashList from "@Components/bases/FlashList";
import { useActionList } from "@Hooks/useActionList";
import useModal from "@Hooks/useModal";
import { useState } from "react";
import ActionModal from "./ActionModal";
import ListItem from "./ListItem";
import useHeader from "./useHeader";

export default function RemindersList() {
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
          <ListItem
            item={item}
            onLongPress={() => {
              setSelectedReminder(item);
              handleOpenModal();
            }}
            onPress={() =>
              openModal("REMINDER", { id: item.id, noteId: item.note_id })
            }
          />
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
