import React from "react";
import {
  Dimensions,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const windowHeight = Dimensions.get("window").height;

export interface BaseModalProps {
  visible: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function BaseModal({
  visible,
  onClose,
  title,
  children,
}: BaseModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 16,
                elevation: 5, // Android shadow
                shadowColor: "#000", // iOS shadow
                shadowOpacity: 0.2,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                minHeight: windowHeight / 3,
              }}
            >
              {title && (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    marginBottom: 12,
                  }}
                >
                  {title}
                </Text>
              )}
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
