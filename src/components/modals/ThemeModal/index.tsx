import BaseModal from "@Components/bases/Modal";
import BaseSwitch from "@Components/bases/Switch";
import SelectInput from "@Components/inputs/SelectInput";
import useChangeTheme from "@Hooks/useChangeTheme";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useForm from "@Hooks/useForm";
import useLocale from "@Hooks/useLocale";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import { themes } from "@Theme/themes";
import { useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import getDefaultValues, { ThemeDefaultValueProps } from "./getDefaultValues";
import ThemeOption from "./ThemeOption";
import useGetThemeConfigs from "./useGetThemeConfigs";

export default function ThemeModal() {
  const theme = useTheme();
  const toast = useToast();
  const changeTheme = useChangeTheme();
  const { formatMessage } = useLocale();
  const { isOpen, closeModal } = useCurrentModal("THEME");

  const [themeConfigs] = useGetThemeConfigs();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ThemeDefaultValueProps>({
    defaultValues: getDefaultValues(themeConfigs),
  });

  const handleConfirm = useCallback(
    (data: ThemeDefaultValueProps) => {
      try {
        changeTheme({
          themeCode: data.themeIndex,
          darkMode: data.isDarkMode,
        });
        closeModal();
      } catch {
        toast.error(formatMessage({ id: "messages.failure.update-theme" }));
      }
    },
    [changeTheme, closeModal, formatMessage, toast],
  );

  const buttons: BaseModalFooterButtonProps[] = [
    { name: "CANCEL", onPress: closeModal },
    { name: "CONFIRM", onPress: handleSubmit(handleConfirm) },
  ];

  const formattedThemes = useMemo(
    () =>
      themes.map(({ name, palette }, index) => ({
        index,
        main: palette.main,
        label: formatMessage({ id: name }),
      })),
    [formatMessage],
  );

  return (
    <BaseModal.Modal
      title={formatMessage({ id: "modals.theme.title" })}
      visible={isOpen}
      onClose={closeModal}
    >
      <BaseModal.Container
        style={{ padding: theme.spacing(4), gap: theme.spacing(4) }}
      >
        <Controller
          control={control}
          name="themeIndex"
          render={({ field: { onChange, value, disabled } }) => (
            <SelectInput
              value={value}
              onChange={(itemValue) => onChange(itemValue.index)}
              label={formatMessage({ id: "modals.theme.fields.theme" })}
              disabled={disabled}
              getOptionValue={(item) => item.index}
              options={formattedThemes}
              renderInputValue={(renderValue) => {
                if (!renderValue) return;

                return (
                  <ThemeOption
                    color={renderValue.main}
                    label={renderValue.label}
                  />
                );
              }}
              renderItem={({ item, selectedItem }) => (
                <ThemeOption
                  color={item.main}
                  label={item.label}
                  selected={item === selectedItem}
                />
              )}
              error={Boolean(errors.themeIndex?.message)}
              helpText={errors.themeIndex?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="isDarkMode"
          render={({ field: { onChange, value, disabled } }) => (
            <BaseSwitch
              label={formatMessage({ id: "modals.theme.fields.dark-mode" })}
              disableIconName="weather-sunny"
              enableIconName="moon-waning-crescent"
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
          )}
        />
      </BaseModal.Container>
      <BaseModal.Footer buttons={buttons} />
    </BaseModal.Modal>
  );
}
