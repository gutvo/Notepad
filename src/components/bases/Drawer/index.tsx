import BaseModalWrapper from "@Components/modals/BaseModalWrapper";
import useOnGoBack from "@Hooks/useOnGoBack";
import useTheme from "@Hooks/useTheme";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.65;

interface BaseDrawerProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BaseDrawer({
  visible,
  onClose,
  children,
}: BaseDrawerProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  function onBackPress() {
    onClose?.();
    return true;
  }

  useOnGoBack({ onBackPress });

  const [isMounted, setIsMounted] = useState(visible);
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setIsMounted(true);

      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.4,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -DRAWER_WIDTH,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsMounted(false);
      });
    }
  }, [overlayOpacity, translateX, visible]);

  if (!isMounted) return null;

  return (
    <BaseModalWrapper
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: theme.palette.common.black,
              opacity: overlayOpacity,
            },
          ]}
        />
      </Pressable>

      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          top: insets.top,
          bottom: insets.bottom,
          width: DRAWER_WIDTH,
          backgroundColor: theme.palette.background.body,

          transform: [{ translateX }],
        }}
      >
        {children}
      </Animated.View>
    </BaseModalWrapper>
  );
}
