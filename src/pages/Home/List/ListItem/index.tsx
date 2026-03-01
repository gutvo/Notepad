import BaseListItemButton from "@Components/bases/ListItemButton";
import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import { format } from "date-fns";

interface ListItemDataProps {
  id: number;
  description: string;
  created_at: Date;
}

interface ListItemProps {
  item: ListItemDataProps;
  onPress?: (item: ListItemDataProps) => void;
  onLongPress?: (item: ListItemDataProps) => void;
}

export default function ListItem({
  item,
  onPress,
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
    <BaseListItemButton
      style={{
        flexDirection: "row",
        paddingHorizontal: theme.spacing(2),
        paddingVertical: theme.spacing(4),
        alignItems: "center",
        gap: theme.spacing(1),
      }}
      label={shortName}
      nameProps={{
        numberOfLines: 1,
        ellipsizeMode: "tail",
        style: { flexShrink: 1, marginRight: theme.spacing(2), flex: 1 },
      }}
      onPress={() => onPress?.(item)}
      onLongPress={() => onLongPress?.(item)}
      Right={
        <BaseTypography variant="BODY2" style={{ flexShrink: 0 }}>
          {formattedDate}
        </BaseTypography>
      }
    />
  );
}
