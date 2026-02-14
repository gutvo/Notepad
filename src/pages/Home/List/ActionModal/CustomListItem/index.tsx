import colors from "@Colors";
import Divider from "@Components/List/Divider";
import { ReactNode } from "react";
import { Pressable, Text } from "react-native";

export interface CustomItemProps {
  name: string;
  onClick?: () => void;
  Icon?: ReactNode;
}

interface CustomListItemProps {
  item: CustomItemProps;
}

export default function CustomListItem({ item }: CustomListItemProps) {
  return (
    <>
      <Pressable
        style={({ pressed }) => [
          {
            paddingVertical: 20,
            paddingHorizontal: 16,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          },
          pressed && { backgroundColor: colors.grey[200] },
        ]}
        onPress={item.onClick}
      >
        {item.Icon && item.Icon}
        <Text style={{ fontSize: 16 }}>{item.name}</Text>
      </Pressable>

      <Divider />
    </>
  );
}
