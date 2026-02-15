import { ReactNode, useCallback, useState } from "react";
import ConfigContext from "./context";

interface ModalProviderProps {
  children: ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalInstanceProps[]>([]);

  const openModal = useCallback((name: ModalNameProps, data?: any) => {
    setModals((prev) => [...prev, { name, data }]);
  }, []);

  const closeModal = useCallback(() => {
    setModals((prev) => prev.slice(0, -1));
  }, []);

  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  return (
    <ConfigContext.Provider
      value={{ openedModals: modals, openModal, closeModal, closeAllModals }}
    >
      {children}
    </ConfigContext.Provider>
  );
}
