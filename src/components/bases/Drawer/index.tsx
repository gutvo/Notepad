import BaseModalWrapper from "@Components/bases/ModalWrapper";
import useOnGoBack from "@Hooks/useOnGoBack";
import useTheme from "@Hooks/useTheme";
import ToastProvider from "@Providers/ToastProvider";
import { ReactNode, useEffect, useState } from "react";
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

  const [translateX] = useState(() => new Animated.Value(-DRAWER_WIDTH));
  const [overlayOpacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const isOpenAnimation = visible
      ? [
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
        ]
      : [
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
        ];

    Animated.parallel(isOpenAnimation).start();
  }, [overlayOpacity, translateX, visible]);

  return (
    <BaseModalWrapper
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <ToastProvider active={visible}>
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
            top: 0,
            bottom: 0,
            width: DRAWER_WIDTH,
            backgroundColor: theme.palette.background.body,
            transform: [{ translateX }],
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
        >
          {children}
        </Animated.View>
      </ToastProvider>
    </BaseModalWrapper>
  );
}
