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
  const insets = useSafeAreaInsets();
  const { title } = useBottomModal();

  return (
    <BottomSheetScrollView
      contentContainerStyle={{ padding: 16 + insets.bottom }}
    >
      {title && <BottomModalTitle title={title} />}

      {children}
    </BottomSheetScrollView>
  );
}
