import actions from "@Actions";
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

export default function HomeList() {
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

  const { data } = useActionList(actions.note.list);

  const notes = data.filter(
    (note) =>
      !search.length ||
      note.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {isOpen && <ThemeModal />}

      <BaseFlashList
        data={notes}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onClick={(item) =>
              navigation.navigate({
                pathname: "/home/detail",
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
        onPress={() => navigation.navigate("/home/detail")}
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
