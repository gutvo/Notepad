import { Modal, ModalProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BaseModalWrapper({
  children,
  style,
  ...rest
}: ModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      transparent
      animationType="fade"
      statusBarTranslucent
      style={[
        {
          top: insets.top,
          left: insets.left,
          right: insets.right,
          bottom: insets.bottom,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Modal>
  );
}
