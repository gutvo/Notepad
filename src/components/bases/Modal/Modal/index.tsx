import BaseModalWrapper from "@Components/modals/BaseModalWrapper";
import useOnGoBack from "@Hooks/useOnGoBack";
import useTheme from "@Hooks/useTheme";
import React from "react";
import {
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import BasemodalHeader from "../Header";

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
  const theme = useTheme();

  function onBackPress() {
    onClose?.();
    return true;
  }

  useOnGoBack({ onBackPress });

  if (!visible) return null;

  return (
    <BaseModalWrapper>
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: theme.spacing(4),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={[
                {
                  backgroundColor: theme.palette.background.body,
                  borderRadius: 4,
                  elevation: 5, // Android shadow
                  shadowColor: theme.palette.common.black, // iOS shadow
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 4 },
                  minHeight: "34%",
                  minWidth: "90%",
                },
                style,
              ]}
            >
              {(title || onClose) && (
                <BasemodalHeader title={title} onClose={onClose} />
              )}
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </BaseModalWrapper>
  );
}
