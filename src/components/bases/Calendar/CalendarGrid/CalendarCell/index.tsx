import BaseButton from "@Components/bases/Button";
import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import { View } from "react-native";

interface CalendarCellProps {
  onPress: () => void;
  day: BaseCalendarDayDataProps;
}

export default function CalendarCell({ day, onPress }: CalendarCellProps) {
  const theme = useTheme();

  return (
    <BaseButton
      onPress={onPress}
      style={{
        width: "14.2857%",
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      disabled={day.disabled}
    >
      <View
        style={[
          {
            width: "80%",
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "100%",
          },
          day.isToday && {
            backgroundColor: theme.palette.isDarkMode
              ? theme.palette.grey[800]
              : theme.palette.grey[200],
          },
          day.isSelected && {
            backgroundColor: theme.palette.primary.main,
          },
        ]}
      >
        <BaseTypography
          style={[
            { fontSize: 14, textAlign: "center" },
            day.isSelected && {
              fontWeight: "bold",
              color: theme.palette.primary.contrast,
            },
            day.disabled && {
              color: theme.palette.background.textSecondary,
            },
          ]}
        >
          {new Date(day.timestamp).getDate()}
        </BaseTypography>
      </View>
    </BaseButton>
  );
}
