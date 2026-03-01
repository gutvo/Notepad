import BaseDivider from "@Components/bases/Divider";
import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import { ReactNode } from "react";
import { Pressable } from "react-native";

export interface CustomItemProps {
  name: string;
  onClick?: () => void;
  Icon?: ReactNode;
  disabled?: boolean;
}

interface CustomListItemProps {
  item: CustomItemProps;
}

export default function CustomListItem({ item }: CustomListItemProps) {
  const theme = useTheme();

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          {
            paddingVertical: theme.spacing(5),
            paddingHorizontal: theme.spacing(4),
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing(4),
            opacity: item.disabled ? 0.4 : 1,
          },
          pressed && {
            backgroundColor: theme.palette.background.button.pressed,
          },
        ]}
        onPress={item.onClick}
        disabled={item.disabled}
      >
        {item.Icon && item.Icon}
        <BaseTypography>{item.name}</BaseTypography>
      </Pressable>

      <BaseDivider />
    </>
  );
}
