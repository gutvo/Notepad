import BaseToast from "@Components/bases/Toast";
import BaseModalWrapper from "@Components/bases/ModalWrapper";
import { ReactNode, useCallback, useState } from "react";
import { View } from "react-native";
import ToastContext from "./context";

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastItem {
  id: string;
  message: string;
  type: BaseToastType;
  onHide: () => void;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const removeAll = useCallback(() => {
    setToasts([]);
  }, []);

  const show = useCallback(
    (message: string, type: BaseToastType = "info") => {
      const id = Date.now().toString() + Math.random();

      setToasts((prev) => [
        ...prev,
        { id, message, type, onHide: () => remove(id) },
      ]);
    },
    [remove],
  );

  const success = useCallback(
    (message: string) => show(message, "success"),
    [show],
  );

  const error = useCallback(
    (message: string) => show(message, "error"),
    [show],
  );

  const warning = useCallback(
    (message: string) => show(message, "warning"),
    [show],
  );

  const info = useCallback((message: string) => show(message, "info"), [show]);

  return (
    <ToastContext.Provider value={{ show, success, error, warning, info }}>
      {children}

      {toasts.length > 0 && (
        <BaseModalWrapper
          visible
          transparent
          animationType="none"
          presentationStyle="overFullScreen"
          statusBarTranslucent
          onRequestClose={removeAll}
        >
          <View style={{ flex: 1 }} pointerEvents="box-none">
            {toasts.map((toast, index) => (
              <BaseToast
                key={toast.id}
                message={toast.message}
                type={toast.type}
                onHide={toast.onHide}
                index={index}
              />
            ))}
          </View>
        </BaseModalWrapper>
      )}
    </ToastContext.Provider>
  );
}
