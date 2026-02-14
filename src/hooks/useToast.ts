import ToastContext from "@Providers/ToastProvider/context";
import { useContext } from "react";

export default function useToast() {
  const context = useContext(ToastContext);

  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
