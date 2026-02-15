import BaseDivider from "@Components/bases/Divider";
import Button from "@Components/buttons/Button";
import useTheme from "@Hooks/useTheme";
import { View } from "react-native";
import getDefaultButtons from "./getDefaultButtons";

interface BaseModalFooterProps {
  buttons?: BaseModalFooterButtonProps[];
  customButtons?: CustomBaseModalFooterButtonProps[];
}

export default function BaseModalFooter({
  buttons = [],
  customButtons = [],
}: BaseModalFooterProps) {
  const theme = useTheme();

  const defaultButtons = getDefaultButtons({ buttons, theme });
  const mergedButtons = defaultButtons.concat(customButtons);

  const sortedButtons = mergedButtons.sort((a, b) => {
    if (!a.position || !b.position) return 0;
    return a.position - b.position;
  });

  return (
    <View style={{ paddingVertical: theme.spacing(3) }}>
      <BaseDivider style={{ marginBottom: theme.spacing(3) }} />

      <View
        style={{
          marginHorizontal: theme.spacing(3),
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing(3),
        }}
      >
        {sortedButtons.map((item) => {
          if (item.hidden) return;

          return (
            <Button
              key={item.name}
              disabled={item.disabled}
              onPress={item.onClick}
              style={[
                { minWidth: 120 },
                item.backgroundColor && {
                  backgroundColor: item.backgroundColor,
                },
              ]}
            >
              {item.label}
            </Button>
          );
        })}
      </View>
    </View>
  );
}
