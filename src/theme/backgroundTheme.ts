import defaultColors from "./defaultColors";

/**
 * Background do tema claro
 * Cores utilizadas para fundos e bordas em modo light
 */
const lightBackground = {
  /** Fundo principal da aplicação */
  body: defaultColors.grey[50],
  /** Cor para texto primário */
  textPrimary: defaultColors.grey[800],
  /** Cor para texto secundário */
  textSecondary: defaultColors.grey[700],
  /** Cor para bordas e separadores */
  border: defaultColors.grey[500],
  /** Efeito ao pressionar componentes */
  button: {
    pressed: defaultColors.grey[300],
  },
};

/**
 * Background do tema escuro
 * Cores utilizadas para fundos e bordas em modo dark
 */
const darkBackground = {
  /** Fundo principal da aplicação (Material Design dark base) */
  body: defaultColors.grey[900],
  /** Cor para texto primário */
  textPrimary: defaultColors.grey[200],
  /** Cor para texto secundário */
  textSecondary: defaultColors.grey[300],
  /** Cor para bordas e separadores */
  border: defaultColors.grey[400],
  /** Efeito ao pressionar componentes */
  button: {
    pressed: defaultColors.grey[800],
  },
};

export { darkBackground, lightBackground };
