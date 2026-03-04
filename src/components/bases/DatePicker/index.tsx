import getFormattedDate from "@Utils/getFormattedDate";
import { ReactNode, useCallback, useState } from "react";
import BaseButton from "../Button";
import BaseCalendarModal, { BaseCalendarModalProps } from "../CalendarModal";
import BaseTypography from "../Typography";

export interface BaseDatePickerProps extends Omit<
  BaseCalendarModalProps,
  "isOpenModal" | "onClose"
> {
  placeholder?: string;
  defaultValue?: Date;
  disabled?: boolean;
  renderInputValue?: (value: Date) => ReactNode;
}

export default function BaseDatePicker({
  disabled,
  onChange,
  value,
  defaultValue,
  renderInputValue,
  placeholder,
  type = "DATE",
  ...modalRest
}: BaseDatePickerProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    defaultValue,
  );

  // Determina se o componente é controlado
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Memoiza os handlers para evitar re-renders desnecessários
  const handleOpenModal = useCallback(() => {
    if (!disabled) {
      setIsOpenModal(true);
    }
  }, [disabled]);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const handleChange = useCallback(
    (newDate?: Date) => {
      // Atualiza estado interno apenas se não for controlado
      if (!isControlled) {
        setInternalValue(newDate);
      }

      // Chama onChange
      onChange?.(newDate);

      // Fecha o modal após a seleção
      setIsOpenModal(false);
    },
    [isControlled, onChange],
  );

  return (
    <>
      <BaseButton
        onPress={handleOpenModal}
        disabled={disabled}
        style={{ flex: 1, zIndex: 2 }}
      >
        {renderInputValue &&
          internalValue !== undefined &&
          renderInputValue(internalValue)}

        {!renderInputValue && (
          <>
            {placeholder &&
              value === undefined &&
              internalValue === undefined && (
                <BaseTypography variant="PLACEHOLDER">
                  {placeholder}
                </BaseTypography>
              )}

            {currentValue && (
              <BaseTypography>
                {getFormattedDate(currentValue, type)}
              </BaseTypography>
            )}
          </>
        )}
      </BaseButton>

      {isOpenModal && (
        <BaseCalendarModal
          isOpenModal={isOpenModal}
          onClose={handleCloseModal}
          onChange={handleChange}
          value={currentValue}
          type={type}
          {...modalRest}
        />
      )}
    </>
  );
}
