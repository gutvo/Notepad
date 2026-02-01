import useGlobalSearchParams from "@Hooks/useGlobalSearchParams";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import TextConfigModal from "./TextConfigModal";
import useGetDefaultSettings from "./useGetDefaultSettings";
import useGetNote from "./useGetNote";
import useHeader from "./useHeader";

export default function HomeDetail() {
  const params = useGlobalSearchParams("HomeDetail");
  const noteId = params?.id ? Number(params?.id) : undefined;

  const [note] = useGetNote({ noteId });

  const [defaultSettings] = useGetDefaultSettings();

  const [description, setDescription] = useState("");
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  function handleOpenModal() {
    setIsOpenedModal(true);
  }

  function handleCloseModal() {
    setIsOpenedModal(false);
  }

  useEffect(() => {
    if (note) {
      setDescription(note.description);
    }
  }, [note]);

  useHeader({ id: noteId, description, handleOpenModal });

  return (
    <>
      <View style={{ flex: 1 }}>
        <TextInput
          multiline
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
          style={{
            flex: 1,
            padding: 16,
            fontSize: (defaultSettings.TEXT_FONT_SIZE as number) ?? 16,
          }}
        />
      </View>

      <TextConfigModal
        isOpenedModal={isOpenedModal}
        onClose={handleCloseModal}
      />
    </>
  );
}
