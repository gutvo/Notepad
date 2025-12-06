import { Text, TouchableOpacity } from "react-native";

interface ListItemProps {
  item: ListItemDataProps;
  onClick?: (data: ListItemDataProps) => void;
}

export default function ListItem({ item }: ListItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 8,
        paddingHorizontal: 8,
        paddingVertical: 16,
      }}
    >
      <Text numberOfLines={1} style={{ fontSize: 16 }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}
