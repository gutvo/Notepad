import useTheme from "@Hooks/useTheme";

type ToastConfigProps = Record<
  BaseToastType,
  {
    color: string;
    icon: BaseIconNameProps;
    title: string;
  }
>;

export default function useToastConfig() {
  const theme = useTheme();

  const toastConfig: ToastConfigProps = {
    success: {
      color: theme.palette.success.main,
      icon: "check-circle-outline",
      title: "Sucesso",
    },
    error: {
      color: theme.palette.error.main,
      icon: "close-circle-outline",
      title: "Erro",
    },
    warning: {
      color: theme.palette.warning.main,
      icon: "alert-circle-outline",
      title: "Alerta",
    },
    info: {
      color: theme.palette.info.main,
      icon: "information-outline",
      title: "Informação",
    },
  };

  return toastConfig;
}
