import colors from "@Colors";
import Divider from "@Components/List/Divider";
import { Pressable, Text } from "react-native";

interface ItemProps {
  name: string;
  onClick?: () => void;
}

interface CustomListItemProps {
  item: ItemProps;
}

export default function CustomListItem({ item }: CustomListItemProps) {
  return (
    <>
      <Pressable
        style={({ pressed }) => [
          { paddingVertical: 10, paddingHorizontal: 16 },
          pressed && { backgroundColor: colors.grey[200] },
        ]}
        onPress={item.onClick}
      >
        <Text style={{ fontSize: 16 }}>{item.name}</Text>
      </Pressable>

      <Divider />
    </>
  );
}
