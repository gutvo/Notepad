import useGlobalSearchParams from "@Hooks/useGlobalSearchParams";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
    getValues,
    formState: { isDirty },
  } = useForm<{ description: string }>({
    defaultValues: { description: note?.description || "" },
  });

  useEffect(() => {
    if (note) {
      reset({ description: note.description });
    }
  }, [note, reset]);

  useHeader({ id: noteId, getValues, isDirty, handleOpenModal });

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
