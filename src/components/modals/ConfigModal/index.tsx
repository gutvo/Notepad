import actions from "@Actions";
import BaseButton from "@Components/bases/Button";
import BaseIcon from "@Components/bases/Icon";
import BaseListItem from "@Components/bases/ListItem";
import BaseModal from "@Components/bases/Modal";
import BaseTypography from "@Components/bases/Typography";
import SelectInput from "@Components/inputs/SelectInput";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useForm from "@Hooks/useForm";
import useGetPrinters from "@Hooks/useGetPrinters";
import useLocale from "@Hooks/useLocale";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import { PAPER_SIZES } from "@Services/PrinterService";
import { useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import getDefaultValues, { ConfigDefaultValueProps } from "./getDefaultValues";
import useGetConfigs from "./useGetConfigs";

export default function ConfigModal() {
  const theme = useTheme();
  const toast = useToast();
  const { formatMessage } = useLocale();
  const { isOpen, closeModal } = useCurrentModal("CONFIG");

  const [configs] = useGetConfigs();
  const { printers } = useGetPrinters();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty, defaultValues },
  } = useForm<ConfigDefaultValueProps>({
    defaultValues: getDefaultValues(configs),
  });

  async function handleConfirm(data: ConfigDefaultValueProps) {
    if (!isDirty) {
      closeModal();
      return;
    }

    setIsLoading(true);

    try {
      if (data.textFontSize !== defaultValues?.textFontSize) {
        await actions.config.update("TEXT_FONT_SIZE", {
          value: data.textFontSize,
        });
      }

      if (defaultValues?.daysBeforeReminder !== data.daysBeforeReminder) {
        await actions.config.update("DAYS_BEFORE_REMINDER", {
          value: data.daysBeforeReminder,
        });
      }

      if (defaultValues?.printerId !== data.printerId) {
        await actions.config.update("PRINTER_ID", { value: data.printerId });
      }

      if (defaultValues?.paperSize !== data?.paperSize) {
        await actions.config.update("PAPER_SIZE", { value: data?.paperSize });
      }

      closeModal();

      toast.success(formatMessage({ id: "messages.success.update-config" }));
    } catch {
      toast.success(formatMessage({ id: "messages.failure.update-config" }));
    } finally {
      setIsLoading(false);
    }
  }

  const buttons: BaseModalFooterButtonProps[] = [
    { name: "CANCEL", onClick: closeModal },
    {
      name: "CONFIRM",
      onClick: handleSubmit(handleConfirm),
      disabled: isLoading,
    },
  ];

  const textFontOptions = useMemo(
    () =>
      Array.from({ length: (80 - 12) / 4 + 1 }, (_, index) => 12 + index * 4),
    [],
  );

  const daysBeforeOptions = useMemo(
    () => Array.from({ length: 11 }, (_, index) => index),
    [],
  );

  return (
    <BaseModal.Modal
      title={formatMessage({ id: "modals.config.title" })}
      visible={isOpen}
      onClose={closeModal}
    >
      <BaseModal.Container style={{ padding: theme.spacing(4) }}>
        <Controller
          control={control}
          name="textFontSize"
          rules={{ required: formatMessage({ id: "validations.required" }) }}
          render={({ field: { onChange, value, disabled } }) => (
            <SelectInput
              value={value}
              onChange={(itemValue) => onChange(itemValue)}
              label={formatMessage({ id: "modals.config.fields.font-size" })}
              disabled={disabled}
              options={textFontOptions}
              renderItem={({ item, selectedItem }) => (
                <BaseListItem
                  name={item}
                  Right={item === selectedItem && <BaseIcon name="check" />}
                  showDivider={false}
                />
              )}
              error={Boolean(errors.textFontSize?.message)}
              helpText={errors.textFontSize?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="daysBeforeReminder"
          rules={{ required: formatMessage({ id: "validations.required" }) }}
          render={({ field: { onChange, value, disabled } }) => (
            <SelectInput
              value={value}
              onChange={(itemValue) => onChange(itemValue)}
              label={formatMessage({
                id: "modals.config.fields.days-before-reminder",
              })}
              disabled={disabled}
              options={daysBeforeOptions}
              renderInputValue={(inputValue) => (
                <BaseTypography>
                  {formatMessage(
                    { id: "modals.config.fields.days-before-reminder-value" },
                    { value: inputValue },
                  )}
                </BaseTypography>
              )}
              renderItem={({ item, selectedItem }) => (
                <BaseListItem
                  name={formatMessage(
                    { id: "modals.config.fields.days-before-reminder-value" },
                    { value: item },
                  )}
                  Right={item === selectedItem && <BaseIcon name="check" />}
                  showDivider={false}
                />
              )}
              error={Boolean(errors.textFontSize?.message)}
              helpText={errors.textFontSize?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="printerId"
          render={({ field: { onChange, value, disabled } }) => (
            <SelectInput
              value={value}
              onChange={(itemValue) => onChange(itemValue.id)}
              label={formatMessage({ id: "modals.config.fields.printer" })}
              disabled={disabled}
              options={printers}
              endIcon={
                value && (
                  <BaseButton
                    onPress={() =>
                      setValue("printerId", "", { shouldDirty: true })
                    }
                  >
                    <BaseIcon name="close" />
                  </BaseButton>
                )
              }
              renderInputValue={(inputValue) => (
                <BaseTypography>{inputValue?.name}</BaseTypography>
              )}
              getOptionValue={(option) => option.id}
              renderItem={({ item, selectedItem }) => (
                <BaseListItem
                  name={item.name}
                  Right={item === selectedItem && <BaseIcon name="check" />}
                  showDivider={false}
                />
              )}
              error={Boolean(errors.printerId?.message)}
              helpText={errors.printerId?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="paperSize"
          render={({ field: { onChange, value, disabled } }) => (
            <SelectInput
              value={value}
              onChange={(itemValue) => onChange(itemValue)}
              label={formatMessage({ id: "modals.config.fields.paper-size" })}
              disabled={disabled}
              options={Object.keys(PAPER_SIZES)}
              renderInputValue={(inputValue) => (
                <BaseTypography>{inputValue}</BaseTypography>
              )}
              renderItem={({ item, selectedItem }) => (
                <BaseListItem
                  name={item}
                  Right={item === selectedItem && <BaseIcon name="check" />}
                  showDivider={false}
                />
              )}
              error={Boolean(errors.printerId?.message)}
              helpText={errors.printerId?.message}
            />
          )}
        />
      </BaseModal.Container>
      <BaseModal.Footer buttons={buttons} />
    </BaseModal.Modal>
  );
}
