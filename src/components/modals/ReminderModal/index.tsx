import actions from "@Actions";
import BaseModal from "@Components/bases/Modal";
import DatePicker from "@Components/inputs/DatePicker";
import TextField from "@Components/inputs/TextField";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useForm from "@Hooks/useForm";
import useLocale from "@Hooks/useLocale";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import { useState } from "react";
import { Controller } from "react-hook-form";
import createNotification from "../../../utils/createNotification";
import deleteNotification from "../../../utils/deleteNotification";
import getDefaultValues from "./getDefaultValues";
import useGetConfigs from "./useGetConfigs";
import useGetReminder from "./useGetReminder";

interface ReminderFormDataProps {
  name: string;
  notify_at: Date;
}

export default function ReminderModal() {
  const toast = useToast();
  const theme = useTheme();
  const { formatMessage } = useLocale();
  const { isOpen, closeModal, data } = useCurrentModal("REMINDER");
  const isUpdate = !!data?.id;

  const [daysBeforeSetting] = useGetConfigs();
  const [reminder] = useGetReminder({ id: data?.id });

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<ReminderFormDataProps>({
    defaultValues: getDefaultValues(reminder),
  });

  function formatDescriptionAsName(
    description: string,
    maxLength: number = 50,
  ) {
    if (!description) return "";

    // Pega a primeira linha
    const firstLine = description.split("\n")[0].trim();

    // Limita ao tamanho máximo
    if (firstLine.length > maxLength) {
      return firstLine.substring(0, maxLength).trim() + "...";
    }

    return firstLine;
  }

  async function handleConfirm(formData: ReminderFormDataProps) {
    if (!isDirty || !data?.noteId) return;

    setIsLoading(true);

    try {
      const note = await actions.note.find(data.noteId);

      if (!note) {
        toast.error(formatMessage({ id: "messages.failure.not-found-note" }));
        return;
      }

      const formattedTitle =
        formData.name || formatDescriptionAsName(note.description);

      if (data.id) {
        await deleteNotification({ reminderId: data.id });
      }

      await createNotification({
        title: formattedTitle,
        date: formData.notify_at,
        daysBefore: daysBeforeSetting,
        noteId: data.noteId,
      });

      toast.success(
        formatMessage({
          id: isUpdate
            ? "messages.success.update-reminder"
            : "messages.success.create-reminder",
        }),
      );

      closeModal();
    } catch {
      toast.success(
        formatMessage({
          id: isUpdate
            ? "messages.failure.update-reminder"
            : "messages.failure.create-reminder",
        }),
      );
    } finally {
      setIsLoading(false);
    }
  }

  const buttons: BaseModalFooterButtonProps[] = [
    { name: "CANCEL", onPress: closeModal },
    {
      name: "CONFIRM",
      label: formatMessage({
        id: isUpdate ? "buttons.save" : "buttons.create",
      }),
      onPress: handleSubmit(handleConfirm),
      disabled: isLoading,
    },
  ];

  return (
    <BaseModal.Modal
      visible={isOpen}
      onClose={closeModal}
      title={formatMessage({
        id: isUpdate
          ? "modals.reminders.title.update"
          : "modals.reminders.title.create",
      })}
    >
      <BaseModal.Container
        style={{ padding: theme.spacing(4), gap: theme.spacing(4) }}
      >
        <Controller
          control={control}
          name="name"
          render={({ field: { value, disabled, onBlur, onChange } }) => (
            <TextField
              value={value}
              onChangeText={onChange}
              label={formatMessage({ id: "modals.reminders.fields-name" })}
              disabled={disabled}
              error={Boolean(errors.name?.message)}
              helpText={errors.name?.message}
              placeholder={formatMessage({
                id: "modals.reminders.fields-name.placeholder",
              })}
              onBlur={onBlur}
            />
          )}
        />

        <Controller
          control={control}
          name="notify_at"
          rules={{ required: formatMessage({ id: "validations.required" }) }}
          render={({ field: { value, disabled, onChange } }) => (
            <DatePicker
              value={value}
              onChange={onChange}
              required
              disabled={disabled}
              label={formatMessage({ id: "modals.reminders.fields-notify-at" })}
              error={Boolean(errors.notify_at?.message)}
              helpText={errors.notify_at?.message}
              placeholder={formatMessage({
                id: "modals.reminders.fields-notify-at.placeholder",
              })}
              disabledToday
              disabledPast
            />
          )}
        />
      </BaseModal.Container>

      <BaseModal.Footer buttons={buttons} />
    </BaseModal.Modal>
  );
}
