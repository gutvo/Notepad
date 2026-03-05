import BaseListItemButton from "@Components/bases/ListItemButton";
import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import getFormattedDate from "@Utils/getFormattedDate";

interface ListItemProps {
  item: ReminderDataProps;
  onPress?: (item: ReminderDataProps) => void;
  onLongPress?: (item: ReminderDataProps) => void;
}

export default function ListItem({
  item,
  onPress,
  onLongPress,
}: ListItemProps) {
  const theme = useTheme();

  return (
    <BaseListItemButton
      style={{
        flexDirection: "row",
        paddingHorizontal: theme.spacing(2),
        paddingVertical: theme.spacing(4),
        alignItems: "center",
        gap: theme.spacing(1),
      }}
      label={item.title}
      nameProps={{
        numberOfLines: 1,
        ellipsizeMode: "tail",
        style: { flexShrink: 1, marginRight: theme.spacing(2), flex: 1 },
      }}
      onPress={() => onPress?.(item)}
      onLongPress={() => onLongPress?.(item)}
      Right={
        <BaseTypography variant="BODY2" style={{ flexShrink: 0 }}>
          {getFormattedDate(item.notificate_at, "DATETIME")}
        </BaseTypography>
      }
    />
  );
}
