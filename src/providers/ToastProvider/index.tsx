import BaseToast from "@Components/bases/Toast";
import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import ToastContext, { ToastContextValue, ToastItem } from "./context";

interface ToastProviderProps {
  children: ReactNode;
  active?: boolean;
}

export default function ToastProvider({
  children,
  active = true,
}: ToastProviderProps) {
  const parentToast = useContext(ToastContext);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [activeHostId, setActiveHostId] = useState<symbol | null>(null);
  const hosts = useRef<symbol[]>([]);
  const [hostId] = useState(() => Symbol("toast-host"));

  const remove = useCallback((id: string) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }, []);

  const registerHost = useCallback((id: symbol) => {
    hosts.current = [
      ...hosts.current.filter((registeredId) => registeredId !== id),
      id,
    ];
    setActiveHostId(id);

    return () => {
      hosts.current = hosts.current.filter(
        (registeredId) => registeredId !== id,
      );
      setActiveHostId(hosts.current[hosts.current.length - 1] ?? null);
    };
  }, []);

  const show = useCallback((message: string, type: BaseToastType = "info") => {
    const id = Date.now().toString() + Math.random();
    setToasts((previous) => [...previous, { id, message, type }]);
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

  const contextValue = useMemo<ToastContextValue>(
    () => ({
      show,
      success,
      error,
      warning,
      info,
      toasts,
      activeHostId,
      remove,
      registerHost,
    }),
    [
      show,
      success,
      error,
      warning,
      info,
      toasts,
      activeHostId,
      remove,
      registerHost,
    ],
  );

  const registerParentHost = parentToast?.registerHost;

  useEffect(() => {
    if (!registerParentHost || !active) return;
    return registerParentHost(hostId);
  }, [active, hostId, registerParentHost]);

  if (parentToast) {
    return (
      <>
        {children}
        {active && parentToast.activeHostId === hostId && (
          <ToastLayer toasts={parentToast.toasts} remove={parentToast.remove} />
        )}
      </>
    );
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {activeHostId === null && <ToastLayer toasts={toasts} remove={remove} />}
    </ToastContext.Provider>
  );
}

function ToastLayer({
  toasts,
  remove,
}: {
  toasts: ToastItem[];
  remove: (id: string) => void;
}) {
  return (
    <View
      pointerEvents="box-none"
      style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}
    >
      {toasts.map((toast, index) => (
        <BaseToast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onHide={() => remove(toast.id)}
          index={index}
        />
      ))}
    </View>
  );
}
