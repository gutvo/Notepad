import colors from "@Colors";
import FloatingButton from "@Components/FloatButton";
import List from "@Components/List";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useActionList } from "@Hooks/useActionList";
import useNavigation from "@Hooks/useNavigation";
import { useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import actions from "src/database/actions";
import ActionModal from "./ActionModal";
import useHeader from "./useHeader";

const windowHeight = Dimensions.get("window").height;

export default function HomeList() {
  const navigation = useNavigation();
  const { search } = useHeader();

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
      <ScrollView style={{ height: windowHeight }}>
        <List
          data={notes}
          onClick={(item) => navigation.navigate("HomeDetail", { id: item.id })}
          onLongPress={(item) => {
            setSelectedNote(item);
            handleOpenModal();
          }}
        />
      </ScrollView>

      <FloatingButton
        onPress={() => navigation.navigate("HomeDetail")}
        icon={
          <MaterialCommunityIcons
            name="plus"
            size={24}
            color={colors.grey[200]}
          />
        }
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
