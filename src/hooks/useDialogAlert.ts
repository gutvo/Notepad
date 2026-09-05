import confirmAlert from "@Utils/confirmAlert";
import { useCallback, useMemo } from "react";
import { AlertButton } from "react-native";
import useLocale from "./useLocale";

interface ShowAlertOptions {
  title: string;
  message: string;
  isDestructive?: boolean;
}

export default function useDialogAlert() {
  const { formatMessage } = useLocale();

  const defaultLabels = useMemo(
    () => ({
      cancel: formatMessage({ id: "buttons.cancel" }),
      confirm: formatMessage({ id: "buttons.confirm" }),
    }),
    [formatMessage],
  );

  const showAlert = useCallback(
    ({ title, message, isDestructive }: ShowAlertOptions): Promise<boolean> => {
      return new Promise((resolve) => {
        const buttons: AlertButton[] = [
          {
            text: defaultLabels.cancel,
            style: "cancel",
            onPress: () => resolve(false),
          },
          {
            text: defaultLabels.confirm,
            style: isDestructive ? "destructive" : "default",
            onPress: () => resolve(true),
          },
        ];

        confirmAlert({
          title,
          message,
          buttons,
          options: {
            cancelable: true,
            onDismiss: () => resolve(false), // clicou fora = cancelou
          },
        });
      });
    },
    [defaultLabels],
  );

  return { showAlert };
}
