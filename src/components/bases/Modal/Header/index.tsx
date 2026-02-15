import BaseButton from "@Components/bases/Button";
import BaseIcon from "@Components/bases/Icon";
import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import { View } from "react-native";

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

      {onClose && (
        <BaseButton
          onPress={onClose}
          style={{ position: "absolute", right: 0 }}
        >
          <BaseIcon
            name="x"
            color={theme.palette.primary.contrast}
            size="large"
          />
        </BaseButton>
      )}
    </View>
  );
}
