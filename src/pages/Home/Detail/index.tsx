import useGlobalSearchParams from "@Hooks/useGlobalSearchParams";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import useGetNote from "./useGetNote";
import useHeader from "./useHeader";

export default function HomeDetail() {
  const params = useGlobalSearchParams("HomeDetail");
  const noteId = params?.id ? Number(params?.id) : undefined;

  const [note] = useGetNote({ noteId });

  const [description, setDescription] = useState("");

  useEffect(() => {
    if (note) {
      setDescription(note.description);
    }
  }, [note]);

  useHeader({ id: noteId, description });

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        multiline
        value={description}
        onChangeText={setDescription}
        textAlignVertical="top"
        style={{
          flex: 1,
          padding: 16,
          fontSize: 16,
        }}
      />
    </View>
  );
}
