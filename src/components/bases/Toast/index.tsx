import BaseButton from "@Components/bases/Button";
import BaseIcon from "@Components/bases/Icon";
import BaseTypography from "@Components/bases/Typography";
import BaseModalWrapper from "@Components/modals/BaseModalWrapper";
import useTheme from "@Hooks/useTheme";
import { Animated, Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useToastConfig from "./toastConfig";
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
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const toastConfig = useToastConfig();

  const { opacity, translateY, close } = useAnimation({ duration, onHide });

  const { color, icon, title } = toastConfig[type];

  function resetDuration() {
    close();
  }

  return (
    <BaseModalWrapper priority={1}>
      <Animated.View
        style={{
          top: insets.top + 10 + index * 90,
          transform: [{ translateY }],
          opacity,
          position: "absolute",
          width: "100%",
          alignItems: "center",
        }}
      >
        <BaseButton onPress={resetDuration}>
          <View
            style={{
              width: Dimensions.get("window").width * 0.92,
              backgroundColor: theme.palette.background.body,
              borderRadius: 16,
              padding: theme.spacing(4),
              flexDirection: "row",
              gap: theme.spacing(3),
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
            <BaseIcon name={icon} color={color} />

            <View style={{ flex: 1 }}>
              <BaseTypography variant="H6">
                {title.toUpperCase()}
              </BaseTypography>

              <BaseTypography
                variant="BODY2"
                style={{ marginTop: theme.spacing(1) }}
              >
                {message}
              </BaseTypography>
            </View>
          </View>
        </BaseButton>
      </Animated.View>
    </BaseModalWrapper>
  );
}
