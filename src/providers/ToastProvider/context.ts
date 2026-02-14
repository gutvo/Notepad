import { createContext } from "react";

const ToastContext = createContext<ToastContextProps | null>(null);

export default ToastContext;
