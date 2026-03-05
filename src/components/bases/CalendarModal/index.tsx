import BaseCalendar, { BaseCalendarProps } from "@Components/bases/Calendar";
import BaseModal from "@Components/bases/Modal";
import useLocale from "@Hooks/useLocale";
import { useState } from "react";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");
export interface BaseCalendarModalProps extends BaseCalendarProps {
  isOpenModal: boolean;
  onClose: () => void;
}

export default function BaseCalendarModal({
  isOpenModal,
  onClose,
  onChange,
  value,
  ...rest
}: BaseCalendarModalProps) {
  const { formatMessage } = useLocale();

  const [internalValue, setInternalValue] = useState(value);

  function handleConfirm() {
    if (onChange) {
      onChange(internalValue);
    }

    onClose();
  }

  const buttons: BaseModalFooterButtonProps[] = [
    { name: "CANCEL", onPress: onClose },
    { name: "CONFIRM", onPress: handleConfirm },
  ];

  return (
    <BaseModal.Modal
      title={formatMessage({ id: "modals.calendar.title" })}
      onClose={onClose}
      visible={isOpenModal}
      style={{ width: width * 0.9 }}
    >
      <BaseModal.Container style={{ flex: 0 }}>
        <BaseCalendar
          value={internalValue}
          onChange={setInternalValue}
          {...rest}
        />
      </BaseModal.Container>

      <BaseModal.Footer buttons={buttons} />
    </BaseModal.Modal>
  );
}
