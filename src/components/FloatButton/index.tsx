import useTheme from "@Hooks/useTheme";
import { ReactNode } from "react";
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const theme = useTheme();

  const insets = useSafeAreaInsets();

  const customStyle:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>) = ({
    pressed,
  }) => [
    {
      position: "absolute",
      bottom: 20 + insets.bottom,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.palette.primary.main,
      alignItems: "center",
      justifyContent: "center",
      elevation: 6,
    },
    pressed && { opacity: 0.8 },
    style,
  ];

  return (
    <Pressable onPress={onPress} style={customStyle}>
      {icon}
    </Pressable>
  );
}
