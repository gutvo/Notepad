import actions from "@Actions";
import { ReminderDataProps } from "@Actions/reminder";
import BaseFlashList from "@Components/bases/FlashList";
import { usePaginatedActionList } from "@Hooks/usePaginatedActionList";
import useNavigation from "@Hooks/useNavigation";
import useTheme from "@Hooks/useTheme";
import { useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";
import ActionModal from "./ActionModal";
import ListItem from "./ListItem";
import useHeader from "./useHeader";

export default function RemindersList() {
  const navigation = useNavigation();
  const theme = useTheme();
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

  const { data, loadingMore, loadMore } = usePaginatedActionList({
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
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              color={theme.palette.primary.main}
              style={{ padding: theme.spacing(4) }}
            />
          ) : null
        }
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
