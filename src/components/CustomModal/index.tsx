import { Portal } from "@Components/Portal";
import { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomModalProps {
  children: ReactNode;
  priority?: number;
}

export default function CustomModal({ children, priority }: CustomModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Portal priority={priority}>
      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          top: insets.top,
          left: insets.left,
          right: insets.right,
          bottom: insets.bottom,
        }}
      >
        {children}
      </View>
    </Portal>
  );
}
