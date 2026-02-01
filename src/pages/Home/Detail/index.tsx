import useGlobalSearchParams from "@Hooks/useGlobalSearchParams";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import actions from "src/database/actions";
import useHeader from "./useHeader";

const windowHeight = Dimensions.get("window").height;

export default function HomeDetail() {
  const params = useGlobalSearchParams("HomeDetail");
  const noteId = (params as { id: number })?.id;

  const inputRef = useRef<TextInput>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function findNote() {
      if (noteId) {
        const currentNote = await actions.note.find(noteId);

        setDescription(currentNote.description);
      }
    }

    findNote();
  }, [noteId]);

  function focusAtEnd() {
    const length = description.length;

    inputRef.current?.focus();
    inputRef.current?.setNativeProps({
      selection: { start: length, end: length },
    });
  }

  useHeader({ id: noteId, description });

  return (
    <TouchableWithoutFeedback onPress={focusAtEnd}>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ height: windowHeight, padding: 10 }}>
          <TextInput
            ref={inputRef}
            multiline
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
            style={{ flex: 1 }}
          />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
