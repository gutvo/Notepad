import actions from "@Actions";
import BaseButton from "@Components/bases/Button";
import BaseFlashList from "@Components/bases/FlashList";
import BaseTypography from "@Components/bases/Typography";
import { useActionList } from "@Hooks/useActionList";
import useModal from "@Hooks/useModal";
import useTheme from "@Hooks/useTheme";
import useHeader from "./useHeader";

export default function RemindersList() {
  const theme = useTheme();
  const { search } = useHeader();
  const { openModal } = useModal();

  const { data } = useActionList(actions.reminder.list, { search });

  return (
    <>
      <BaseFlashList
        data={data}
        renderItem={({ item }) => (
          <BaseButton
            onPress={() =>
              openModal("REMINDER", { id: item.id, noteId: item.note_id })
            }
            style={({ pressed }) => [
              { padding: theme.spacing(4) },
              pressed && { backgroundColor: theme.palette.background.border },
            ]}
          >
            <BaseTypography>{item.title}</BaseTypography>
          </BaseButton>
        )}
      />
    </>
  );
}
