import actions from "@Actions";
import { NoteDataProps } from "@Actions/note";
import BaseFlashList from "@Components/bases/FlashList";
import BaseIcon from "@Components/bases/Icon";
import FloatingButton from "@Components/buttons/FloatButton";
import ThemeModal from "@Components/modals/ThemeModal";
import { usePaginatedActionList } from "@Hooks/usePaginatedActionList";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useNavigation from "@Hooks/useNavigation";
import useTheme from "@Hooks/useTheme";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";
import ActionModal from "./ActionModal";
import ListItem from "./ListItem";
import useHeader from "./useHeader";

export default function NotesList() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { search } = useHeader();
  const options = useMemo(
    () => ({
      description: { like: search.trim() },
      deleted_at: { isNull: true },
    }),
    [search],
  );

  const { isOpen } = useCurrentModal("THEME");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteDataProps | null>(null);

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  const formatNotes = useCallback(async (notes: NoteDataProps[]) => {
    if (!notes.length) return [];

    const reminders = await actions.reminder.list({
      note_id: { in: notes.map((note) => note.id) },
      deleted_at: { isNull: true },
    });
    const notesWithReminders = new Set(
      reminders.map((reminder) => reminder.note_id),
    );

    return notes.map((note) => ({
      ...note,
      hasReminder: notesWithReminders.has(note.id),
    }));
  }, []);

  const { data, loadingMore, loadMore, reload } = usePaginatedActionList({
    actions: actions.note,
    options,
    format: formatNotes,
  });

  useEffect(() => {
    const subscription = actions.reminder.observer?.subscribe(() => {
      void reload();
    });

    return () => subscription?.unsubscribe();
  }, [reload]);

  return (
    <>
      {isOpen && <ThemeModal />}

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
            hasReminder={"hasReminder" in item && item.hasReminder}
            onPress={(item) =>
              navigation.navigate({
                pathname: "/notes/detail",
                params: { id: item.id },
              })
            }
            onLongPress={(item) => {
              setSelectedNote(item);
              handleOpenModal();
            }}
          />
        )}
      />

      <FloatingButton
        onPress={() => navigation.navigate("/notes/detail")}
        icon={<BaseIcon name="plus" color={theme.palette.primary.contrast} />}
      />

      <ActionModal
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
    </>
  );
}
