import BaseIcon from "@Components/BaseIcon";
import BaseTypography from "@Components/BaseTypography";
import useTheme from "@Hooks/useTheme";
import { TouchableOpacity, View } from "react-native";

interface BasemodalHeaderProps {
  title?: string;
  onClose?: () => void;
}

export default function BasemodalHeader({
  title,
  onClose,
}: BasemodalHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.palette.primary.main,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        height: 40,
        borderTopEndRadius: 4,
        borderTopStartRadius: 4,
      }}
    >
      <BaseTypography
        variant="H4"
        style={{ color: theme.palette.primary.contrast }}
      >
        {title}
      </BaseTypography>

      <TouchableOpacity
        onPress={onClose}
        style={{ position: "absolute", right: 0 }}
      >
        <BaseIcon
          name="close"
          color={theme.palette.primary.contrast}
          size="large"
        />
      </TouchableOpacity>
    </View>
  );
}
