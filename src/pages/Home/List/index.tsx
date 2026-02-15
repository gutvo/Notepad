import BaseIcon from "@Components/BaseIcon";
import BaseDivider from "@Components/bases/Divider";
import FloatingButton from "@Components/buttons/FloatButton";
import ThemeModal from "@Components/modals/ThemeModal";
import { useActionList } from "@Hooks/useActionList";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useNavigation from "@Hooks/useNavigation";
import useTheme from "@Hooks/useTheme";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import actions from "src/database/actions";
import ActionModal from "./ActionModal";
import Drawer from "./Drawer";
import ListItem from "./ListItem";
import useHeader from "./useHeader";

const windowHeight = Dimensions.get("window").height;

export default function HomeList() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { search } = useHeader();

  const { isOpen } = useCurrentModal("THEME");
  const { isOpen: sideBarIsOpen } = useCurrentModal("SIDEBAR");

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
      {sideBarIsOpen && <Drawer />}

      {isOpen && <ThemeModal />}

      <ScrollView
        style={{
          height: windowHeight,
          backgroundColor: theme.palette.background.body,
        }}
      >
        <FlashList
          style={{ backgroundColor: theme.palette.background.body }}
          data={notes}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onClick={(item) =>
                navigation.navigate("HomeDetail", { id: item.id })
              }
              onLongPress={(item) => {
                setSelectedNote(item);
                handleOpenModal();
              }}
            />
          )}
          ItemSeparatorComponent={() => <BaseDivider />}
        />
      </ScrollView>
      <FloatingButton
        onPress={() => navigation.navigate("HomeDetail")}
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
