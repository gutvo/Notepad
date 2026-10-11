import actions from "@Actions";
import { NoteDataProps } from "@Actions/note";
import BaseFlashList from "@Components/bases/FlashList";
import BaseIcon from "@Components/bases/Icon";
import FloatingButton from "@Components/buttons/FloatButton";
import ThemeModal from "@Components/modals/ThemeModal";
import { useActionList } from "@Hooks/useActionList";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useNavigation from "@Hooks/useNavigation";
import useTheme from "@Hooks/useTheme";
import { useState } from "react";
import ActionModal from "./ActionModal";
import ListItem from "./ListItem";
import useHeader from "./useHeader";

export default function NotesList() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { search } = useHeader();

  const { isOpen } = useCurrentModal("THEME");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteDataProps | null>(null);

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  const { data } = useActionList({
    actions: actions.note,
    options:
      search && search.trim()
        ? { description: { like: search.trim() } }
        : undefined,
  });

  return (
    <>
      {isOpen && <ThemeModal />}

      <BaseFlashList
        data={data}
        renderItem={({ item }) => (
          <ListItem
            item={item}
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
