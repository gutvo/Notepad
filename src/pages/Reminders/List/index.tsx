import actions from "@Actions";
import { ReminderDataProps } from "@Actions/reminder";
import BaseFlashList from "@Components/bases/FlashList";
import { useActionList } from "@Hooks/useActionList";
import useNavigation from "@Hooks/useNavigation";
import { useMemo, useState } from "react";
import ActionModal from "./ActionModal";
import ListItem from "./ListItem";
import useHeader from "./useHeader";

export default function RemindersList() {
  const navigation = useNavigation();
  const { search } = useHeader();
  const options = useMemo(
    () => ({
      title: { like: search },
      message: { like: search },
      parent_id: { isNull: true },
      notificate_at: { greaterThan: new Date() },
      deleted_at: { isNull: true },
    }),
    [search],
  );

  const { data } = useActionList({
    actions: actions.reminder,
    options,
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
              navigation.navigate({
                pathname: "/reminders/detail",
                params: { id: item.id },
              })
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
