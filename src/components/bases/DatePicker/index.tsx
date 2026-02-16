import { ReactNode, useState } from "react";
import BaseButton from "../Button";
import BaseTypography from "../Typography";
import BaseCalendarModal from "./BaseCalendarModal";

export interface BaseSelectInputProps {
  placeholder?: string;
  value?: Date;
  defaultValue?: Date;
  onChange?: (data: Date) => void;
  disabled?: boolean;
  renderInputValue?: (value: Date) => ReactNode;
}

export default function BaseDatePicker({
  disabled,
  onChange,
  value,
  defaultValue,
  renderInputValue,
}: BaseSelectInputProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    defaultValue,
  );

  const isControlled = value !== undefined;

  const currentValue = isControlled ? value : internalValue;

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleChange(newDate: Date) {
    if (!isControlled) {
      setInternalValue(newDate);
    }

    onChange?.(newDate);
  }

  return (
    <>
      <BaseButton
        onPress={handleOpenModal}
        disabled={disabled}
        style={{ flex: 1 }}
      >
        {currentValue && (
          <>
            {renderInputValue ? (
              renderInputValue(currentValue)
            ) : (
              <BaseTypography>
                {currentValue.toLocaleDateString("pt-BR")}
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
        />
      )}
    </>
  );
}
