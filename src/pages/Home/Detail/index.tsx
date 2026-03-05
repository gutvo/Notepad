import useForm from "@Hooks/useForm";
import useLocale from "@Hooks/useLocale";
import useNavigation from "@Hooks/useNavigation";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { TextInput, View } from "react-native";
import defaultValues from "./defaultValues";
import useGetDefaultSettings from "./useGetDefaultSettings";
import useGetNote from "./useGetNote";
import useHeader from "./useHeader";
import createNote from "./utils/createNote";
import deleteNote from "./utils/deleteNote";
import updateNote from "./utils/updateNote";

interface HomeDetailProps {
  noteId?: number;
}

export default function HomeDetail({ noteId }: HomeDetailProps) {
  const theme = useTheme();
  const toast = useToast();
  const navigation = useNavigation();
  const { formatMessage } = useLocale();

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
        await deleteNote({ id: noteId, toast, formatMessage });
        navigation.back();
      } else if (isUpdate) {
        await updateNote({
          id: noteId,
          description: data.description,
          toast,
          formatMessage,
        });
        navigation.back();
      } else {
        await createNote({
          description: data.description,
          toast,
          formatMessage,
        });
        navigation.back();
      }
    } catch {
      if (isDelete) {
        toast.error(formatMessage({ id: "messages.failure.delete-note" }));
        return;
      }

      toast.error(
        formatMessage({
          id: noteId
            ? "messages.failure.update-note"
            : "messages.failure.create-note",
        }),
      );
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
                color: theme.palette.text.primary,
              }}
            />
          )}
        />
      </View>
    </>
  );
}
