import actions from "@Actions";
import BaseModal from "@Components/bases/Modal";
import BaseSwitch from "@Components/bases/Switch";
import SelectInput from "@Components/inputs/SelectInput";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import locales from "@Locales";
import { themes } from "@Theme/themes";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import getDefaultValues, { ThemeDefaultValueProps } from "./getDefaultValues";
import ThemeOption from "./ThemeOption";
import useGetThemeConfigs from "./useGetThemeConfigs";

export default function ThemeModal() {
  const theme = useTheme();
  const toast = useToast();
  const { isOpen, closeModal } = useCurrentModal("THEME");

  const [themeConfigs] = useGetThemeConfigs();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
  } = useForm<ThemeDefaultValueProps>({
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    if (themeConfigs.length) {
      reset(getDefaultValues(themeConfigs));
    }
  }, [reset, themeConfigs]);

  async function handleConfirm(data: ThemeDefaultValueProps) {
    if (!isDirty) {
      closeModal();
      return;
    }

    await actions.config.update("THEME_INDEX", { value: data.themeIndex });
    await actions.config.update("THEME_IS_DARK_MODE", {
      value: data.isDarkMode,
    });

    closeModal();

    toast.success(locales.theme.modal.success);
  }

  const buttons: BaseModalFooterButtonProps[] = [
    { name: "CANCEL", onClick: closeModal },
    { name: "CONFIRM", onClick: handleSubmit(handleConfirm) },
  ];

  const formattedThemes = useMemo(
    () =>
      themes.reduce<Record<number, { index: number; main: string }>>(
        (accumulator, themeObject, index) => {
          accumulator[index] = {
            index,
            main: themeObject.main,
          };

          return accumulator;
        },
        {},
      ),
    [],
  );

  return (
    <BaseModal.Modal
      title={locales.theme.modal.title}
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
              label={locales.theme.modal.section.theme.label}
              disabled={disabled}
              getOptionValue={(item) => item.index}
              options={Object.values(formattedThemes)}
              renderInputValue={(renderValue) => (
                <ThemeOption
                  color={formattedThemes[renderValue].main}
                  label={locales.theme.modal.section.theme.optionLabel.replace(
                    "{index}",
                    String(renderValue + 1),
                  )}
                />
              )}
              renderItem={({ item, selectedItem, index }) => (
                <ThemeOption
                  color={item.main}
                  label={locales.theme.modal.section.theme.optionLabel.replace(
                    "{index}",
                    String(index + 1),
                  )}
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
              label={locales.theme.modal.section.darkMode.label}
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
