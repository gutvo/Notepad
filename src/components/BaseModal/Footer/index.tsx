import BaseButton from "@Components/BaseButton";
import Divider from "@Components/List/Divider";
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
  const defaultButtons = getDefaultButtons({ buttons });
  const mergedButtons = defaultButtons.concat(customButtons);

  const sortedButtons = mergedButtons.sort((a, b) => {
    if (!a.position || !b.position) return 0;
    return a.position - b.position;
  });

  return (
    <View style={{ paddingVertical: 12 }}>
      <Divider style={{ marginBottom: 12 }} />

      <View
        style={{
          marginHorizontal: 12,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        {sortedButtons.map((item) => {
          if (item.hidden) return;

          return (
            <BaseButton
              key={item.name}
              disabled={item.disabled}
              style={[
                { width: 100 },
                item.backgroundColor && {
                  backgroundColor: item.backgroundColor,
                },
              ]}
            >
              {item.label}
            </BaseButton>
          );
        })}
      </View>
    </View>
  );
}
