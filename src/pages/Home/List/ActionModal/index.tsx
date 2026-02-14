import BottomModal from "@Components/BottomModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useNavigation from "@Hooks/useNavigation";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import { Dispatch, SetStateAction } from "react";
import actions from "src/database/actions";
import CustomListItem, { CustomItemProps } from "./CustomListItem";

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
  const theme = useTheme();
  const toast = useToast();
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

    toast.success("Nota deletada com sucesso!");
  }

  async function handleDuplicateNote() {
    if (!selectedNote) return;

    await actions.note.create({ description: selectedNote.description });

    setSelectedNote(null);
    handleCloseModal();

    toast.success("Nota duplicada com sucesso!");
  }

  const options: CustomItemProps[] = [
    {
      name: "Visualizar",
      onClick: handleVisualizeNote,
      Icon: (
        <MaterialCommunityIcons
          name="eye-outline"
          size={24}
          color={theme.palette.background.textPrimary}
        />
      ),
    },
    {
      name: "Duplicar",
      onClick: handleDuplicateNote,
      Icon: (
        <MaterialCommunityIcons
          name="content-duplicate"
          size={24}
          color={theme.palette.background.textPrimary}
        />
      ),
    },
    {
      name: "Deletar",
      onClick: handleDeleteNote,
      Icon: (
        <MaterialCommunityIcons
          name="delete-outline"
          size={24}
          color={theme.palette.background.textPrimary}
        />
      ),
    },
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
        contentContainerStyle={{ paddingVertical: theme.spacing(3) }}
      />
    </BottomModal.Modal>
  );
}
