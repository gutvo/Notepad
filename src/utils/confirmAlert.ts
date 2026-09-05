import { Alert, AlertButton, AlertOptions } from "react-native";

interface ConfirmAlertProps {
  title: string;
  message: string;
  buttons: AlertButton[];
  options?: AlertOptions;
}

export default function confirmAlert({
  buttons,
  title,
  message,
  options,
}: ConfirmAlertProps) {
  Alert.alert(title, message, buttons, options);
}
