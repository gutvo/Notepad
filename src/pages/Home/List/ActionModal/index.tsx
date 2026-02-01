import BottomModal from "@Components/BottomModal";
import useNavigation from "@Hooks/useNavigation";
import { Dispatch, SetStateAction } from "react";
import actions from "src/database/actions";
import CustomListItem from "./CustomListItem";

interface ActionModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  selectedNote: NoteDataProps | null;
  setSelectedNote: Dispatch<SetStateAction<NoteDataProps | null>>;
}

export default function ActionModal({
  handleCloseModal,
  isOpenModal,
  selectedNote,
  setSelectedNote,
}: ActionModalProps) {
  const navigation = useNavigation();

  function handleVisualizeNote() {
    if (!selectedNote) return;

    navigation.navigate("HomeDetail", { id: selectedNote.id });
    setSelectedNote(null);
    handleCloseModal();
  }

  async function handleDeleteNote() {
    if (!selectedNote) return;

    await actions.note.delete(selectedNote.id);

    setSelectedNote(null);
    handleCloseModal();
  }

  const options = [
    { name: "Visualizar", onClick: handleVisualizeNote },
    { name: "Deletar", onClick: handleDeleteNote },
  ];

  return (
    <BottomModal.Modal
      isOpen={isOpenModal}
      title="Opções"
      onClose={handleCloseModal}
    >
      <BottomModal.FlatList
        data={options}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <CustomListItem item={item} />}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </BottomModal.Modal>
  );
}
