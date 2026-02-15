import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import useTheme from "@Hooks/useTheme";
import { ReactNode, useEffect, useRef } from "react";
import BottomModalContext from "../context";

interface BottomModalModalProps {
  title?: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export default function BottomModalModal({
  title,
  isOpen,
  onClose,
  children,
}: BottomModalModalProps) {
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      enableDynamicSizing
      enablePanDownToClose
      onClose={onClose}
      index={-1}
      onChange={(index) => {
        if (index === -1) onClose();
      }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      backgroundStyle={{ backgroundColor: theme.palette.background.body }}
      handleIndicatorStyle={{
        backgroundColor: theme.palette.background.textSecondary,
      }}
    >
      <BottomModalContext.Provider value={{ title }}>
        {children}
      </BottomModalContext.Provider>
    </BottomSheet>
  );
}
