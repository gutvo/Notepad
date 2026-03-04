import BaseButton from "@Components/bases/Button";
import BaseTypography from "@Components/bases/Typography";
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
        borderRadius: 4,
      }}
    >
      {buttons.map((button) => (
        <BaseButton
          key={button.name}
          onPress={button.onPress}
          style={{
            flex: 1,
            justifyContent: "center",
            padding: theme.spacing(2),
            backgroundColor: button.isSelected
              ? theme.palette.primary.main
              : "transparent",
          }}
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
        </BaseButton>
      ))}
    </View>
  );
}
