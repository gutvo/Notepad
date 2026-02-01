import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
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
    >
      <BottomModalContext.Provider value={{ title }}>
        {children}
      </BottomModalContext.Provider>
    </BottomSheet>
  );
}
