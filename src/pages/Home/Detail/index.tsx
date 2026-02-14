import useGlobalSearchParams from "@Hooks/useGlobalSearchParams";
import useToast from "@Hooks/useToast";
import { useEffect, useState } from "react";
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

  const onSubmit = handleSubmit(async (data) => {
    const isDelete = !data.description.trim() && noteId;
    const isUpdate = !!noteId;

    try {
      if (isDelete) {
        await deleteNote({ id: noteId, toast });
      } else if (isUpdate) {
        await updateNote({ id: noteId, description: data.description, toast });
      } else {
        await createNote({ description: data.description, toast });
      }
    } catch {
      if (isDelete) {
        toast.error("Erro ao deletar nota!");
        return;
      }

      toast.error(noteId ? "Erro ao atualizar nota!" : "Erro ao criar nota!");
    }
  });

  useEffect(() => {
    if (note) {
      reset({ description: note.description });
    }
  }, [note, reset]);

  useHeader({ onSubmit, handleOpenModal, isDirty });

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
