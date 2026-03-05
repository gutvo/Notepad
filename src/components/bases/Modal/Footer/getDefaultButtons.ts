import { FormatMessageProps } from "@Hooks/useLocale";
import { ThemeProps } from "@Providers/ThemeProvider/types";

interface GetDefaultButtonsProps {
  buttons: BaseModalFooterButtonProps[];
  theme: ThemeProps;
  formatMessage: FormatMessageProps;
}

export default function getDefaultButtons({
  buttons,
  theme,
  formatMessage,
}: GetDefaultButtonsProps) {
  const defaultButtons: Record<
    BaseModalFooterButtonNames,
    Omit<CustomBaseModalFooterButtonProps, "name">
  > = {
    CONFIRM: {
      label: formatMessage({ id: "buttons.confirm" }),
      backgroundColor: theme.palette.primary.main,
    },
    CANCEL: {
      label: formatMessage({ id: "buttons.cancel" }),
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
