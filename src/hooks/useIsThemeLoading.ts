import ThemeContext from "@Providers/ThemeProvider/context";
import { useContext } from "react";

export default function useIsThemeLoading() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Erro ao abrir o contexto");
  }

  return themeContext.isThemeLoading;
}
