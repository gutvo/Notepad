import useGlobalSearchParams from "@Hooks/useGlobalSearchParams";
import useToast from "@Hooks/useToast";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, View } from "react-native";
import defaultValues from "./defaultValues";
import TextConfigModal from "./TextConfigModal";
import useGetDefaultSettings from "./useGetDefaultSettings";
import useGetNote from "./useGetNote";
import useHeader from "./useHeader";
import createNote from "./utils/createNote";
import deleteNote from "./utils/deleteNote";
import updateNote from "./utils/updateNote";

export default function HomeDetail() {
  const toast = useToast();
  const navigation = useNavigation();

  const params = useGlobalSearchParams("HomeDetail");
  const noteId = params?.id ? Number(params?.id) : undefined;

  const [note] = useGetNote({ noteId });

  const [defaultSettings] = useGetDefaultSettings();

  const [isOpenedModal, setIsOpenedModal] = useState(false);

  function handleOpenModal() {
    setIsOpenedModal(true);
  }

  function handleCloseModal() {
    setIsOpenedModal(false);
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<{ description: string }>({
    defaultValues,
  });

  const handleExitNote = useCallback(
    async (description: string, id?: number) => {
      if (!description.trim() && id) {
        return deleteNote({ id, toast });
      }

      if (id) {
        return updateNote({ id, description, toast });
      }

      return createNote({ description, toast });
    },
    [toast],
  );

  const onSubmit = handleSubmit(async (data) => {
    if (!navigation.canGoBack()) return;

    if (!isDirty) {
      navigation.goBack();
      return;
    }

    try {
      await handleExitNote(data.description, noteId);

      navigation.goBack();
    } catch {
      toast.error(noteId ? "Erro ao atualizar nota!" : "Erro ao criar nota!");
    }
  });

  useEffect(() => {
    if (note) {
      reset({ description: note.description });
    }
  }, [note, reset]);

  useHeader({ onSubmit, handleOpenModal });

  return (
    <>
      <View style={{ flex: 1 }}>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              multiline
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              textAlignVertical="top"
              style={{
                flex: 1,
                padding: 16,
                fontSize: (defaultSettings.TEXT_FONT_SIZE as number) ?? 16,
              }}
            />
          )}
        />
      </View>

      <TextConfigModal
        isOpenedModal={isOpenedModal}
        onClose={handleCloseModal}
      />
    </>
  );
}
