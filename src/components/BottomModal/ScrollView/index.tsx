import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ReactNode } from "react";
import BottomModalTitle from "../Title";
import { useBottomModal } from "../context";

interface BottomModalScrollViewProps {
  children: ReactNode;
}

export default function BottomModalScrollView({
  children,
}: BottomModalScrollViewProps) {
  const { title } = useBottomModal();

  return (
    <BottomSheetScrollView contentContainerStyle={{ padding: 16 }}>
      {title && <BottomModalTitle title={title} />}

      {children}
    </BottomSheetScrollView>
  );
}
