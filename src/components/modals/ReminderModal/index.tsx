import actions from "@Actions";
import BaseModal from "@Components/bases/Modal";
import DatePicker from "@Components/inputs/DatePicker";
import TextField from "@Components/inputs/TextField";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useForm from "@Hooks/useForm";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import locales from "@Locales";
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
  const { isOpen, closeModal, data } = useCurrentModal("REMINDER");
  const isUpdate = !!data?.id;

  const [daysBeforeSetting] = useGetConfigs();
  const [reminder] = useGetReminder({ id: data?.id });

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

    try {
      const note = await actions.note.find(data.noteId);

      if (!note) {
        toast.error("Notificação não encontrada!");
        return;
      }

      const formattedTitle =
        formData.name ?? formatDescriptionAsName(note.description);

      if (data.id) {
        await deleteNotification({ reminderId: data.id });
      }

      await createNotification({
        title: formattedTitle,
        date: formData.notify_at,
        daysBefore: daysBeforeSetting,
        noteId: data.noteId,
      });

      closeModal();

      toast.success(
        data.id
          ? "Lembrete atualizado com sucesso!"
          : "Lembrete adicionado com sucesso!",
      );
    } catch {
      toast.success(
        data.id ? "Erro ao atualizar lembrete!" : "Erro ao criar lembrete!",
      );
    }
  }

  const buttons: BaseModalFooterButtonProps[] = [
    { name: "CANCEL", onClick: closeModal },
    {
      name: "CONFIRM",
      label: isUpdate ? "Atualizar" : "Criar",
      onClick: handleSubmit(handleConfirm),
    },
  ];

  return (
    <BaseModal.Modal
      visible={isOpen}
      onClose={closeModal}
      title={isUpdate ? "Atualizar lembrete" : "Adicionar lembrete"}
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
              label="Título da notificação"
              disabled={disabled}
              error={Boolean(errors.name?.message)}
              helpText={errors.name?.message}
              placeholder="Título"
              onBlur={onBlur}
            />
          )}
        />

        <Controller
          control={control}
          name="notify_at"
          rules={{ required: locales.validations.required }}
          render={({ field: { value, disabled, onChange } }) => (
            <DatePicker
              value={value}
              onChange={onChange}
              required
              disabled={disabled}
              label="Data da notificação"
              error={Boolean(errors.notify_at?.message)}
              helpText={errors.notify_at?.message}
              placeholder="Notificar na data"
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
