import BaseModal from "@Components/BaseModal";
import BaseTypography from "@Components/BaseTypography";
import SelectInput from "@Components/SelectInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import { themes } from "@Theme/themes";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import getDefaultValues, { ThemeDefaultValueProps } from "./getDefaultValues";

export default function ConfigModal() {
  const theme = useTheme();
  const toast = useToast();
  const { isOpen, closeModal } = useCurrentModal("CONFIG");

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
  } = useForm<ThemeDefaultValueProps>({
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    // if (configs.length) {
    //   reset(getDefaultValues(configs));
    // }
  }, [reset]);

  async function handleConfirm(data: ThemeDefaultValueProps) {
    if (!isDirty) {
      closeModal();
      return;
    }

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
      <BaseModal.Container style={{ padding: theme.spacing(4) }}>
        <Controller
          control={control}
          name="themeIndex"
          rules={{ required: "Campo obrigatório" }}
          render={({ field: { onChange, value, disabled } }) => (
            <SelectInput
              value={value}
              onChange={(itemValue) => onChange(itemValue)}
              label="Tamanho da fonte"
              disabled={disabled}
              options={themes}
              renderItem={({ item, selectedItem, index }) => {
                return (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: theme.spacing(3),
                    }}
                  >
                    <View style={{ backgroundColor: "red" }} />
                    <BaseTypography style={{ flex: 1 }}>
                      Tema {index}
                    </BaseTypography>

                    {item === selectedItem && (
                      <MaterialCommunityIcons
                        name="check"
                        color={theme.palette.background.textPrimary}
                        size={24}
                      />
                    )}
                  </View>
                );
              }}
              error={Boolean(errors.themeIndex?.message)}
              helpText={errors.themeIndex?.message}
            />
          )}
        />
      </BaseModal.Container>
      <BaseModal.Footer buttons={buttons} />
    </BaseModal.Modal>
  );
}
