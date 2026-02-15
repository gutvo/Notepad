import BaseButton from "@Components/bases/Button";
import useTheme from "@Hooks/useTheme";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";

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

  return (
    <BaseButton
      onPress={onPress}
      style={[
        {
          position: "absolute",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: theme.palette.primary.main,
          alignItems: "center",
          justifyContent: "center",
          elevation: 6,
        },
        style,
      ]}
    >
      {icon}
    </BaseButton>
  );
}
