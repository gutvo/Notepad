import useTheme from "@Hooks/useTheme";
import { ReactNode } from "react";
import { View } from "react-native";

interface BlankViewProps {
  children?: ReactNode;
}

export default function BlankView({ children }: BlankViewProps) {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.palette.background.body }}>
      {children}
    </View>
  );
}
