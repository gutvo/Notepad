import ModalContext from "@Providers/ModalProvider/context";
import { useContext, useMemo } from "react";

export function useCurrentModal<NameProps extends ModalNameProps>(
  name: NameProps,
) {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("Erro ao abrir o contexto");
  }

  const { openedModals, closeModal } = modalContext;

  const modal = useMemo(
    () =>
      openedModals.find(
        (modal): modal is ModalInstanceProps<NameProps> => modal.name === name,
      ),
    [openedModals, name],
  );

  const isOpen = !!modal;
  const data = modal?.data ?? undefined;

  return { isOpen, data, closeModal };
}
