import BaseIcon from "@Components/bases/Icon";
import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import { View } from "react-native";

interface CardProps {
  title: string;
  subtitle: string;
  message: string;
  isCompleted: boolean;
  isPrimaryTheme?: boolean;
  showStatusIcon?: boolean;
}

export default function Card({
  message,
  subtitle,
  title,
  isCompleted,
  isPrimaryTheme,
  showStatusIcon = true,
}: CardProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: isPrimaryTheme
          ? theme.palette.primary.main
          : theme.palette.background.card,
        padding: theme.spacing(2),
        elevation: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 4,
      }}
    >
      <View style={{ flex: 1, marginRight: theme.spacing(2) }}>
        <BaseTypography
          variant="BODY2"
          style={{
            color: isPrimaryTheme
              ? theme.palette.primary.contrast
              : theme.palette.text.secondary,
          }}
        >
          {title}
        </BaseTypography>
        <BaseTypography
          style={{
            color: isPrimaryTheme
              ? theme.palette.primary.contrast
              : theme.palette.text.primary,
          }}
        >
          {subtitle}
        </BaseTypography>
        <BaseTypography
          style={{
            color: isPrimaryTheme
              ? theme.palette.primary.contrast
              : theme.palette.text.primary,
          }}
        >
          {message}
        </BaseTypography>
      </View>

      {showStatusIcon && (
        <BaseIcon
          color={
            isPrimaryTheme
              ? theme.palette.primary.contrast
              : isCompleted
                ? theme.palette.success.main
                : theme.palette.warning.main
          }
          name={isCompleted ? "check" : "clock-time-eight-outline"}
        />
      )}
    </View>
  );
}
