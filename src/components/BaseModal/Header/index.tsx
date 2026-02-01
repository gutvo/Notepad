import colors from "@Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface BasemodalHeaderProps {
  title?: string;
  onClose?: () => void;
}

export default function BasemodalHeader({
  title,
  onClose,
}: BasemodalHeaderProps) {
  return (
    <View
      style={{
        backgroundColor: colors.primary.main,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        height: 36,
        borderTopEndRadius: 4,
        borderTopStartRadius: 4,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          textAlign: "center",
          color: colors.primary.contrast,
        }}
      >
        {title}
      </Text>

      <TouchableOpacity
        onPress={onClose}
        style={{ position: "absolute", right: 0 }}
      >
        <MaterialCommunityIcons
          name="close"
          color={colors.primary.contrast}
          size={32}
        />
      </TouchableOpacity>
    </View>
  );
}
