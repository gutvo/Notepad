import ModalContext from "@Providers/ModalProvider/context";
import { useContext } from "react";

export default function useOpenModal() {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("Erro ao abrir o contexto");
  }

  return modalContext.openModal;
}
