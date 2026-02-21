interface ReminderModalDataProps {
  id?: number;
  noteId: number;
}

interface ModalMapProps {
  CONFIG: undefined;
  SIDEBAR: undefined;
  THEME: undefined;
  REMINDER: ReminderModalDataProps;
}

type ModalNameProps = keyof ModalMapProps;

type ModalInstanceProps<NameProps extends ModalNameProps = ModalNameProps> = {
  name: NameProps;
  data: ModalMapProps[NameProps];
};

interface ModalContextProps {
  openedModals: ModalInstanceProps[];
  openModal: (
    name: ModalNameProps,
    data?: ModalMapProps[ModalNameProps],
  ) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}
