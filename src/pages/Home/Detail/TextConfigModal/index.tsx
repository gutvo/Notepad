import actions from "@Actions";
import BaseModal from "@Components/BaseModal";
import { Picker } from "@react-native-picker/picker";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import getDefaultValues, { ConfigDefaultValueProps } from "./getDefaultValues";
import useGetConfigs from "./useGetConfigs";
interface TextConfigModalProps {
  isOpenedModal: boolean;
  onClose: () => void;
}

export default function TextConfigModal({
  onClose,
  isOpenedModal,
}: TextConfigModalProps) {
  const [configs] = useGetConfigs();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ConfigDefaultValueProps>({
    defaultValues: getDefaultValues(configs),
  });

  useEffect(() => {
    if (configs.length) {
      reset(getDefaultValues(configs));
    }
  }, [configs, reset]);

  async function handleConfirm(data: ConfigDefaultValueProps) {
    const findConfig = configs.find(({ key }) => key === "TEXT_FONT_SIZE");

    if (!findConfig) return;

    await actions.config.update(findConfig.key, { value: data.textFontSize });
    onClose();
  }

  const buttons: BaseModalFooterButtonProps[] = [
    { name: "CANCEL", onClick: onClose },
    { name: "CONFIRM", onClick: handleSubmit(handleConfirm) },
  ];

  return (
    <BaseModal.Modal
      title="Configurações"
      visible={isOpenedModal}
      onClose={onClose}
    >
      <BaseModal.Container style={{ padding: 16 }}>
        <Controller
          control={control}
          name="textFontSize"
          rules={{ required: "Senha é obrigatória" }}
          render={({ field: { onChange, value, onBlur, ref, disabled } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              onBlur={onBlur}
              ref={ref}
              enabled={!disabled}
            >
              {Array.from(
                { length: (80 - 12) / 4 + 1 },
                (_, index) => 12 + index * 4,
              ).map((item) => (
                <Picker.Item key={item} label={String(item)} value={item} />
              ))}
            </Picker>
          )}
        />
      </BaseModal.Container>
      <BaseModal.Footer buttons={buttons} />
    </BaseModal.Modal>
  );
}
