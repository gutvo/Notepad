import colors from "@Colors";

interface GetDefaultButtonsProps {
  buttons: BaseModalFooterButtonProps[];
}

export default function getDefaultButtons({ buttons }: GetDefaultButtonsProps) {
  const defaultButtons: Record<
    BaseModalFooterButtonNames,
    Omit<CustomBaseModalFooterButtonProps, "name">
  > = {
    CONFIRM: { label: "Confirmar", backgroundColor: colors.primary.main },
    CANCEL: {
      label: "Cancelar",
      backgroundColor: colors.grey[700],
      color: colors.grey[50],
    },
  };

  const mergedButtons = buttons.reduce<CustomBaseModalFooterButtonProps[]>(
    (accumulator, button) => {
      const findDefaultButton = defaultButtons[button.name];

      if (findDefaultButton) {
        accumulator.push({ ...findDefaultButton, ...button });
      }

      return accumulator;
    },
    [],
  );

  return mergedButtons;
}
