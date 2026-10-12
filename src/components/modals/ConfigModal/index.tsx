import actions from "@Actions";
import BaseIcon from "@Components/bases/Icon";
import BaseListItem from "@Components/bases/ListItem";
import BaseModal from "@Components/bases/Modal";
import BaseTypography from "@Components/bases/Typography";
import SelectInput from "@Components/inputs/SelectInput";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useForm from "@Hooks/useForm";
import useLocale from "@Hooks/useLocale";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
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

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
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
          value: String(data.textFontSize),
        });
      }

      if (defaultValues?.daysBeforeReminder !== data.daysBeforeReminder) {
        await actions.config.update("DAYS_BEFORE_REMINDER", {
          value: String(data.daysBeforeReminder),
        });
      }

      if (defaultValues?.trashRetentionDays !== data.trashRetentionDays) {
        await actions.config.update("TRASH_RETENTION_DAYS", {
          value: String(data.trashRetentionDays),
        });
      }

      closeModal();
    } catch {
      toast.error(formatMessage({ id: "messages.failure.update-config" }));
    } finally {
      setIsLoading(false);
    }
  }

  const buttons: BaseModalFooterButtonProps[] = [
    { name: "CANCEL", onPress: closeModal },
    {
      name: "CONFIRM",
      onPress: handleSubmit(handleConfirm),
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
  const trashRetentionOptions = useMemo(() => [0, 7, 30, 90], []);

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
          name="trashRetentionDays"
          rules={{ required: formatMessage({ id: "validations.required" }) }}
          render={({ field: { onChange, value, disabled } }) => (
            <SelectInput
              value={value}
              onChange={(itemValue) => onChange(itemValue)}
              label={formatMessage({
                id: "modals.config.fields.trash-retention",
              })}
              disabled={disabled}
              options={trashRetentionOptions}
              renderInputValue={(inputValue) => (
                <BaseTypography>
                  {inputValue === 0
                    ? formatMessage({
                        id: "modals.config.fields.trash-retention-never",
                      })
                    : formatMessage(
                        { id: "modals.config.fields.trash-retention-value" },
                        { value: inputValue },
                      )}
                </BaseTypography>
              )}
              renderItem={({ item, selectedItem }) => (
                <BaseListItem
                  name={
                    item === 0
                      ? formatMessage({
                          id: "modals.config.fields.trash-retention-never",
                        })
                      : formatMessage(
                          {
                            id: "modals.config.fields.trash-retention-value",
                          },
                          { value: item },
                        )
                  }
                  Right={item === selectedItem && <BaseIcon name="check" />}
                  showDivider={false}
                />
              )}
              error={Boolean(errors.trashRetentionDays?.message)}
              helpText={errors.trashRetentionDays?.message}
            />
          )}
        />
      </BaseModal.Container>
      <BaseModal.Footer buttons={buttons} />
    </BaseModal.Modal>
  );
}
