import merge from "lodash.merge";
import { darkBackground, lightBackground } from "./backgroundTheme";
import defaultColors from "./defaultColors";
import { themes } from "./themes";

interface MergeThemeProps {
  isDarkMode: boolean;
  themeIndex: number;
}

/**
 * Mescla os diferentes componentes do tema
 *
 * Estrutura final do tema:
 * - defaultColors: cores de status (info, success, warning, error)
 * - background: cores de fundo baseadas no modo (light/dark)
 * - primary: cor primária selecionada pelo usuário
 * - isDarkMode: flag indicando o modo atual
 *
 * @param {boolean} isDarkMode - Define se está em modo escuro
 * @param {number} themeIndex - Índice do tema primário (0-7)
 * @returns {ThemePaletteProps} Tema mesclado e pronto para uso
 */
export default function mergeTheme({
  isDarkMode,
  themeIndex,
}: MergeThemeProps) {
  const currentTheme = { primary: themes[themeIndex] };
  const currentBackgroundTheme = {
    background: isDarkMode ? darkBackground : lightBackground,
  };
  const mergedTheme = merge(
    defaultColors,
    currentBackgroundTheme,
    currentTheme,
    { isDarkMode },
  );

  return { ...mergedTheme };
}

export type ThemePaletteProps = ReturnType<typeof mergeTheme>;
