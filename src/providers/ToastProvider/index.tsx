import BaseToast from "@Components/BaseToast";
import { ReactNode, useCallback, useState } from "react";
import ToastContext from "./context";

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastItem {
  id: string;
  message: string;
  type: BaseToastType;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback((message: string, type: BaseToastType = "info") => {
    const id = Date.now().toString() + Math.random();

    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

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

      {toasts.map((toast, index) => (
        <BaseToast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onHide={() => remove(toast.id)}
          index={index}
        />
      ))}
    </ToastContext.Provider>
  );
}
