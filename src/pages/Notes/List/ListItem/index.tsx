import { NoteDataProps } from "@Actions/note";
import BaseIcon from "@Components/bases/Icon";
import BaseListItemButton from "@Components/bases/ListItemButton";
import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import getFormattedDate from "@Utils/getFormattedDate";
import { View } from "react-native";

interface ListItemProps {
  item: NoteDataProps;
  hasReminder?: boolean;
  date?: Date;
  onPress?: (item: NoteDataProps) => void;
  onLongPress?: (item: NoteDataProps) => void;
}

export default function ListItem({
  item,
  hasReminder = false,
  date = item.created_at,
  onPress,
  onLongPress,
}: ListItemProps) {
  const theme = useTheme();

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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing(2),
          }}
        >
          {hasReminder && <BaseIcon name="bell-outline" size="small" />}
          <BaseTypography variant="BODY2" style={{ flexShrink: 0 }}>
            {getFormattedDate(date, "DATETIME")}
          </BaseTypography>
        </View>
      }
    />
  );
}
