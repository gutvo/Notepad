import colors from "@Colors";
import { ReactNode } from "react";
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from "react-native";

type FloatingButtonProps = {
  onPress: () => void;
  icon?: ReactNode;
  style?: ViewStyle;
};

export default function FloatingButton({
  onPress,
  icon,
  style,
}: FloatingButtonProps) {
  const customStyle:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>) = ({
    pressed,
  }) => [
    {
      position: "absolute",
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary.main,
      alignItems: "center",
      justifyContent: "center",
      elevation: 6,
    },
    pressed && {
      opacity: 0.8,
    },
    style,
  ];

  return (
    <Pressable onPress={onPress} style={customStyle}>
      {icon}
    </Pressable>
  );
}
