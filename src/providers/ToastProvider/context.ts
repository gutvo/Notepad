import { createContext } from "react";

export interface ToastItem {
  id: string;
  message: string;
  type: BaseToastType;
}

export interface ToastContextValue extends ToastContextProps {
  toasts: ToastItem[];
  activeHostId: symbol | null;
  remove: (id: string) => void;
  registerHost: (id: symbol) => () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export default ToastContext;
