import BaseCalendar from "@Components/bases/Calendar";
import BaseModal from "@Components/bases/Modal";
import { useMemo, useState } from "react";

interface BaseCalendarModalProps {
  isOpenModal: boolean;
  onClose: () => void;
  value?: Date;
  onChange?: (data: Date) => void;
}

export default function BaseCalendarModal({
  isOpenModal,
  onClose,
  onChange,
  value,
}: BaseCalendarModalProps) {
  const today = useMemo(() => new Date(), []);
  const [internalValue, setInternalValue] = useState(value ?? today);

  function handleConfirm() {
    if (onChange) {
      onChange(internalValue);
    }

    onClose();
  }

  const buttons: BaseModalFooterButtonProps[] = [
    { name: "CANCEL", onClick: onClose },
    { name: "CONFIRM", onClick: handleConfirm },
  ];

  return (
    <BaseModal.Modal title="Calendário" onClose={onClose} visible={isOpenModal}>
      <BaseModal.Container style={{ flex: 0 }}>
        <BaseCalendar
          value={internalValue}
          onChange={setInternalValue}
          disabledPast
        />
      </BaseModal.Container>

      <BaseModal.Footer buttons={buttons} />
    </BaseModal.Modal>
  );
}
