import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import { format } from "date-fns";
import { Pressable } from "react-native";

interface ListItemDataProps {
  id: number;
  description: string;
  created_at: Date;
}

interface ListItemProps {
  item: ListItemDataProps;
  onClick?: (item: ListItemDataProps) => void;
  onLongPress?: (item: ListItemDataProps) => void;
}

export default function ListItem({
  item,
  onClick,
  onLongPress,
}: ListItemProps) {
  const theme = useTheme();

  const formattedDate = format(item.created_at, "dd/MM/yyyy HH:mm");

  const firstLine = item.description
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0);

  const shortName = firstLine
    ? firstLine.replace(/\s+/g, " ").slice(0, 50)
    : "";

  return (
    <Pressable
      style={({ pressed }) => [
        {
          flexDirection: "row",
          paddingHorizontal: theme.spacing(2),
          paddingVertical: theme.spacing(4),
          alignItems: "center",
          gap: theme.spacing(1),
        },
        pressed && { backgroundColor: theme.palette.background.button.pressed },
      ]}
      onPress={() => onClick?.(item)}
      onLongPress={() => onLongPress?.(item)}
    >
      <BaseTypography
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{ flexShrink: 1, marginRight: theme.spacing(2), flex: 1 }}
      >
        {shortName}
      </BaseTypography>
      <BaseTypography variant="BODY2" style={{ flexShrink: 0 }}>
        {formattedDate}
      </BaseTypography>
    </Pressable>
  );
}
