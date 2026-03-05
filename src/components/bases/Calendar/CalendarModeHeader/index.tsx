import BaseTypography from "@Components/bases/Typography";
import Button from "@Components/buttons/Button";
import useLocale from "@Hooks/useLocale";
import useTheme from "@Hooks/useTheme";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";

interface CalendarModeHeaderProps {
  viewMode: "calendar" | "clock";
  setViewMode: Dispatch<SetStateAction<"calendar" | "clock">>;
}

export default function CalendarModeHeader({
  viewMode,
  setViewMode,
}: CalendarModeHeaderProps) {
  const { formatMessage } = useLocale();
  const theme = useTheme();

  const buttons = [
    {
      name: "calendar",
      onPress: () => setViewMode("calendar"),
      isSelected: viewMode === "calendar",
      label: formatMessage({ id: "modals.calendars.button.date" }),
    },
    {
      name: "clock",
      onPress: () => setViewMode("clock"),
      isSelected: viewMode === "clock",
      label: formatMessage({ id: "modals.calendars.button.clock" }),
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: theme.spacing(4),
        gap: theme.spacing(2),
      }}
    >
      {buttons.map((button) => (
        <Button
          key={button.name}
          onPress={button.onPress}
          variant={button.isSelected ? "CONTAINED" : "OUTLINED"}
        >
          <BaseTypography
            style={{
              fontWeight: button.isSelected ? "bold" : "normal",
              color: button.isSelected
                ? theme.palette.primary.contrast
                : theme.palette.text.primary,
            }}
            variant="BUTTON"
          >
            {button.label}
          </BaseTypography>
        </Button>
      ))}
    </View>
  );
}
