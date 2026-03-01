import BaseCalendar, { BaseCalendarProps } from "@Components/bases/Calendar";
import BaseModal from "@Components/bases/Modal";
import { useState } from "react";

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
    <BaseModal.Modal title="Calendário" onClose={onClose} visible={isOpenModal}>
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
