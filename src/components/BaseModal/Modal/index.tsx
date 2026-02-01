import colors from "@Colors";
import React from "react";
import {
  Dimensions,
  Modal,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import BasemodalHeader from "../Header";

const windowHeight = Dimensions.get("window").height;

export interface BaseModalProps {
  visible: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function BaseModalModal({
  visible,
  onClose,
  title,
  children,
  style,
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
              style={[
                {
                  backgroundColor: colors.common.white,
                  borderRadius: 4,
                  elevation: 5, // Android shadow
                  shadowColor: colors.common.black, // iOS shadow
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 4 },
                  minHeight: windowHeight / 3,
                },
                style,
              ]}
            >
              <BasemodalHeader title={title} onClose={onClose} />

              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
