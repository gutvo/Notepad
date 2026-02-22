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

type OpenModalFunctionProps = <Name extends ModalNameProps>(
  name: Name,
  ...args: ModalMapProps[Name] extends undefined
    ? []
    : [data: ModalMapProps[Name]]
) => void;

interface ModalContextProps {
  openedModals: ModalInstanceProps[];

  openModal: OpenModalFunctionProps;

  closeModal: (name?: ModalNameProps) => void;

  closeAllModals: () => void;
}
