import BaseIcon from "@Components/bases/Icon";
import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import { View } from "react-native";

interface ThemeOptionProps {
  color: string;
  label: string;
  selected?: boolean;
}

export default function ThemeOption({
  color,
  label,
  selected,
}: ThemeOptionProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing(3),
        padding: theme.spacing(4),
      }}
    >
      <View
        style={{
          backgroundColor: color,
          width: 24,
          height: 24,
          borderRadius: 8,
        }}
      />
      <BaseTypography style={{ flex: 1 }}>{label}</BaseTypography>

      {selected && <BaseIcon name="check" />}
    </View>
  );
}
