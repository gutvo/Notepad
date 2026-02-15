import CustomModal from "@Components/CustomModal";
import useTheme from "@Hooks/useTheme";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const Drawer_WIDTH = width * 0.65;

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
  const theme = useTheme();

  const [isMounted, setIsMounted] = useState(visible);
  const translateX = useRef(new Animated.Value(-Drawer_WIDTH)).current;
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
          toValue: -Drawer_WIDTH,
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
    <CustomModal>
      <View style={StyleSheet.absoluteFill}>
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
            width: Drawer_WIDTH,
            backgroundColor: theme.palette.background.body,

            transform: [{ translateX }],
          }}
        >
          {children}
        </Animated.View>
      </View>
    </CustomModal>
  );
}
