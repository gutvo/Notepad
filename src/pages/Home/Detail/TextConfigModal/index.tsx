import BaseModal from "@Components/BaseModal";
import { Text } from "react-native";

interface TextConfigModalProps {
  isOpenedModal: boolean;
  onClose: () => void;
}

export default function TextConfigModal({
  onClose,
  isOpenedModal,
}: TextConfigModalProps) {
  function handleConfirm() {}

  const buttons: BaseModalFooterButtonProps[] = [
    { name: "CANCEL", onclick: onClose },
    { name: "CONFIRM", onclick: handleConfirm },
  ];

  return (
    <BaseModal.Modal
      title="Configurações"
      visible={isOpenedModal}
      onClose={onClose}
    >
      <BaseModal.Container>
        <Text>TESTE</Text>
      </BaseModal.Container>
      <BaseModal.Footer buttons={buttons} />
    </BaseModal.Modal>
  );
}
