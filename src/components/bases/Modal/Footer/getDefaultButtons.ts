import locales from "@Locales";
import { ThemeProps } from "@Providers/ThemeProvider/types";

interface GetDefaultButtonsProps {
  buttons: BaseModalFooterButtonProps[];
  theme: ThemeProps;
}

export default function getDefaultButtons({
  buttons,
  theme,
}: GetDefaultButtonsProps) {
  const defaultButtons: Record<
    BaseModalFooterButtonNames,
    Omit<CustomBaseModalFooterButtonProps, "name">
  > = {
    CONFIRM: {
      label: locales.buttons.confirm,
      backgroundColor: theme.palette.primary.main,
    },
    CANCEL: {
      label: locales.buttons.cancel,
      backgroundColor: theme.palette.grey[700],
      color: theme.palette.grey[50],
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
