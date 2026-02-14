import actions from "@Actions";
import BaseModal from "@Components/BaseModal";
import SelectInput from "@Components/SelectInput";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useToast from "@Hooks/useToast";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import getDefaultValues, { ConfigDefaultValueProps } from "./getDefaultValues";
import useGetConfigs from "./useGetConfigs";

export default function ConfigModal() {
  const toast = useToast();
  const { isOpen, closeModal } = useCurrentModal("CONFIG");

  const [configs] = useGetConfigs();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ConfigDefaultValueProps>({
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    if (configs.length) {
      reset(getDefaultValues(configs));
    }
  }, [configs, reset]);

  async function handleConfirm(data: ConfigDefaultValueProps) {
    await actions.config.update("TEXT_FONT_SIZE", { value: data.textFontSize });
    closeModal();

    toast.success("Configuração atualizadas com sucesso!");
  }

  const buttons: BaseModalFooterButtonProps[] = [
    { name: "CANCEL", onClick: closeModal },
    { name: "CONFIRM", onClick: handleSubmit(handleConfirm) },
  ];

  return (
    <BaseModal.Modal
      title="Configurações"
      visible={isOpen}
      onClose={closeModal}
    >
      <BaseModal.Container style={{ padding: 16 }}>
        <Controller
          control={control}
          name="textFontSize"
          rules={{ required: "Campo obrigatório" }}
          render={({ field: { onChange, value, onBlur, disabled } }) => (
            <SelectInput
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              onBlur={onBlur}
              label="Tamanho da fonte"
              disabled={disabled}
              options={Array.from(
                { length: (80 - 12) / 4 + 1 },
                (_, index) => 12 + index * 4,
              ).map((option) => ({ label: String(option), value: option }))}
              error={Boolean(errors.textFontSize?.message)}
              helpText={errors.textFontSize?.message}
            />
          )}
        />
      </BaseModal.Container>
      <BaseModal.Footer buttons={buttons} />
    </BaseModal.Modal>
  );
}
