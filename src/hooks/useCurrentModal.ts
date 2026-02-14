import ModalContext from "@Providers/ModalProvider/context";
import { useContext, useMemo } from "react";

export function useCurrentModal<T = any>(name: ModalNameProps) {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("Erro ao abrir o contexto");
  }

  const { openedModals, closeModal } = modalContext;

  const modal = useMemo(
    () => openedModals.find((m) => m.name === name),
    [openedModals, name],
  );

  const isOpen = !!modal;
  const data = (modal?.data as T) ?? null;

  return { isOpen, data, closeModal };
}
