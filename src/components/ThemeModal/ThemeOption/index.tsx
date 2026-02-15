import BaseTypography from "@Components/BaseTypography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

      {selected && (
        <MaterialCommunityIcons
          name="check"
          size={24}
          color={theme.palette.background.textPrimary}
        />
      )}
    </View>
  );
}
