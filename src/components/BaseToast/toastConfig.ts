import colors from "@Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ToastConfigProps = Record<
  BaseToastType,
  {
    color: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    title: string;
  }
>;

const toastConfig: ToastConfigProps = {
  success: {
    color: colors.success.main,
    icon: "check-circle-outline",
    title: "Sucesso",
  },
  error: {
    color: colors.error.main,
    icon: "close-circle-outline",
    title: "Erro",
  },
  warning: {
    color: colors.warning.main,
    icon: "alert-circle-outline",
    title: "Alerta",
  },
  info: {
    color: colors.info.main,
    icon: "information-outline",
    title: "Informação",
  },
};

export default toastConfig;
