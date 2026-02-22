import ModalContext from "@Providers/ModalProvider/context";
import { useContext } from "react";

export default function useModal() {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("Erro ao abrir o contexto");
  }

  return {
    openModal: modalContext.openModal,
    closeAllModals: modalContext.closeAllModals,
  };
}
