import colors from "@Colors";
import { format } from "date-fns";
import { Pressable, Text } from "react-native";

interface ListItemProps {
  item: ListItemDataProps;
  onClick?: (item: ListItemDataProps) => void;
}

export default function ListItem({ item, onClick }: ListItemProps) {
  const formattedDate = format(item.created_at, "dd/MM/yyyy HH:mm");

  return (
    <Pressable
      style={({ pressed }) => [
        {
          flexDirection: "row",
          paddingHorizontal: 8,
          paddingVertical: 16,
          alignItems: "center",
          gap: 4,
        },
        pressed && { backgroundColor: colors.grey[300] },
      ]}
      onPress={() => onClick?.(item)}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{ fontSize: 16, flexShrink: 1, marginRight: 8, flex: 1 }}
      >
        {item.name}
      </Text>
      <Text style={{ flexShrink: 0, fontSize: 12 }}>{formattedDate}</Text>
    </Pressable>
  );
}
