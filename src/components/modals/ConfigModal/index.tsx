import actions from "@Actions";
import BaseModal from "@Components/BaseModal";
import BaseIcon from "@Components/bases/Icon";
import BaseTypography from "@Components/BaseTypography";
import SelectInput from "@Components/inputs/SelectInput";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import getDefaultValues, { ConfigDefaultValueProps } from "./getDefaultValues";
import useGetConfigs from "./useGetConfigs";

export default function ConfigModal() {
  const theme = useTheme();
  const toast = useToast();
  const { isOpen, closeModal } = useCurrentModal("CONFIG");

  const [configs] = useGetConfigs();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
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
    if (!isDirty) {
      closeModal();
      return;
    }

    await actions.config.update("TEXT_FONT_SIZE", { value: data.textFontSize });
    closeModal();

    toast.success("Configuração atualizadas com sucesso!");
  }

  const buttons: BaseModalFooterButtonProps[] = [
    { name: "CANCEL", onClick: closeModal },
    { name: "CONFIRM", onClick: handleSubmit(handleConfirm) },
  ];

  const textFontOptions = useMemo(
    () =>
      Array.from({ length: (80 - 12) / 4 + 1 }, (_, index) => 12 + index * 4),
    [],
  );

  return (
    <BaseModal.Modal
      title="Configurações"
      visible={isOpen}
      onClose={closeModal}
    >
      <BaseModal.Container style={{ padding: theme.spacing(4) }}>
        <Controller
          control={control}
          name="textFontSize"
          rules={{ required: "Campo obrigatório" }}
          render={({ field: { onChange, value, disabled } }) => (
            <SelectInput
              value={value}
              onChange={(itemValue) => onChange(itemValue)}
              label="Tamanho da fonte"
              disabled={disabled}
              options={textFontOptions}
              renderItem={({ item, selectedItem }) => {
                return (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: theme.spacing(3),
                    }}
                  >
                    <BaseTypography style={{ flex: 1 }}>{item}</BaseTypography>

                    {item === selectedItem && <BaseIcon name="check" />}
                  </View>
                );
              }}
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
