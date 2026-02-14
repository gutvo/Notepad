import useTheme from "@Hooks/useTheme";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomModalTitle from "../Title";
import { useBottomModal } from "../context";

interface BottomModalScrollViewProps {
  children: ReactNode;
}

export default function BottomModalScrollView({
  children,
}: BottomModalScrollViewProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { title } = useBottomModal();

  return (
    <BottomSheetScrollView
      contentContainerStyle={{
        padding: theme.spacing(4) + insets.bottom,
        backgroundColor: theme.palette.background.body,
      }}
    >
      {title && <BottomModalTitle title={title} />}

      {children}
    </BottomSheetScrollView>
  );
}
