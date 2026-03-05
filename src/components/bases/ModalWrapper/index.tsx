import { Modal, ModalProps } from "react-native";

export default function BaseModalWrapper({ children, ...rest }: ModalProps) {
  return (
    <Modal transparent animationType="fade" statusBarTranslucent {...rest}>
      {children}
    </Modal>
  );
}
