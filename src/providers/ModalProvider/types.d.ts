type ModalMapProps = {
  CONFIG: undefined;
  SIDEBAR: undefined;
  THEME: undefined;
};

type ModalNameProps = keyof ModalMapProps;

type ModalInstanceProps<K extends ModalName = ModalName> = {
  name: K;
  data: ModalMap[K];
};

interface ModalContextProps {
  openedModals: ModalInstanceProps[];
  openModal: (name: ModalNameProps) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}
