import { BottomSheet } from "@expo/ui/community/bottom-sheet";
import useTheme from "@Hooks/useTheme";
import ToastProvider from "@Providers/ToastProvider";
import { ReactNode } from "react";
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

  return (
    <BottomSheet
      enableDynamicSizing
      enablePanDownToClose
      index={isOpen ? 0 : -1}
      onClose={onClose}
      backgroundStyle={{ backgroundColor: theme.palette.background.body }}
      handleIndicatorStyle={{
        backgroundColor: theme.palette.text.secondary,
      }}
    >
      <ToastProvider active={isOpen}>
        <BottomModalContext.Provider value={{ title }}>
          {children}
        </BottomModalContext.Provider>
      </ToastProvider>
    </BottomSheet>
  );
}
