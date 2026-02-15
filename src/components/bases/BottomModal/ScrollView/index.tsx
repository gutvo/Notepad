import useTheme from "@Hooks/useTheme";
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
  const theme = useTheme();
  const { title } = useBottomModal();

  return (
    <BottomSheetScrollView
      contentContainerStyle={{
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.body,
      }}
    >
      {title && <BottomModalTitle title={title} />}

      {children}
    </BottomSheetScrollView>
  );
}
