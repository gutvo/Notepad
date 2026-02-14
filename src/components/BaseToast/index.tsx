import BaseTypography from "@Components/BaseTypography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Animated, Dimensions, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import toastConfig from "./toastConfig";
import useAnimation from "./useAnimation";

interface BaseToastProps {
  message: string;
  type?: BaseToastType;
  duration?: number;
  onHide: () => void;
  index: number;
}

export default function BaseToast({
  message,
  type = "success",
  duration = 3000,
  onHide,
  index,
}: BaseToastProps) {
  const insets = useSafeAreaInsets();

  const { opacity, translateY, close } = useAnimation({ duration, onHide });

  const { color, icon, title } = toastConfig[type];

  function resetDuration() {
    close();
  }

  return (
    <Animated.View
      style={{
        top: insets.top + 10 + index * 90,
        transform: [{ translateY }],
        opacity,
        position: "absolute",
        width: "100%",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <TouchableOpacity onPress={resetDuration}>
        <View
          style={{
            width: Dimensions.get("window").width * 0.92,
            backgroundColor: "white",
            borderRadius: 16,
            padding: 16,
            flexDirection: "row",
            gap: 12,
            alignItems: "center",

            borderLeftWidth: 6,

            // iOS shadow
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },

            // Android elevation
            elevation: 6,

            borderLeftColor: color,
          }}
        >
          <MaterialCommunityIcons name={icon} size={24} color={color} />

          <View style={{ flex: 1 }}>
            <BaseTypography variant="H6">{title.toUpperCase()}</BaseTypography>

            <BaseTypography variant="BODY2" style={{ marginTop: 4 }}>
              {message}
            </BaseTypography>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
