import useGlobalSearchParams from "@Hooks/useGlobalSearchParams";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, View } from "react-native";
import defaultValues from "./defaultValues";
import useGetDefaultSettings from "./useGetDefaultSettings";
import useGetNote from "./useGetNote";
import useHeader from "./useHeader";
import createNote from "./utils/createNote";
import deleteNote from "./utils/deleteNote";
import updateNote from "./utils/updateNote";

export default function HomeDetail() {
  const theme = useTheme();
  const toast = useToast();

  const params = useGlobalSearchParams("HomeDetail");
  const noteId = params?.id ? Number(params?.id) : undefined;

  const [note] = useGetNote({ noteId });

  const [defaultSettings] = useGetDefaultSettings();

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

  useHeader({ onSubmit, isDirty });

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
                padding: theme.spacing(4),
                fontSize:
                  (defaultSettings.TEXT_FONT_SIZE as number) ??
                  theme.fontSize(4),
                backgroundColor: theme.palette.background.body,
                color: theme.palette.background.textPrimary,
              }}
            />
          )}
        />
      </View>
    </>
  );
}
