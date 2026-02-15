import defaultColors from "./defaultColors";

/**
 * Background do tema claro
 * Cores utilizadas para fundos e bordas em modo light
 * Otimizado para acessibilidade WCAG AAA (contraste 7:1)
 */
const lightBackground = {
  /** Fundo principal da aplicação */
  body: defaultColors.grey[50],
  /** Cor para texto primário - máximo contraste */
  textPrimary: defaultColors.grey[900],
  /** Cor para texto secundário */
  textSecondary: defaultColors.grey[700],
  /** Cor para bordas e separadores */
  border: defaultColors.grey[400],
  /** Efeito ao pressionar componentes */
  button: {
    pressed: defaultColors.grey[200],
  },
};

/**
 * Background do tema escuro
 * Cores utilizadas para fundos e bordas em modo dark
 * Otimizado para acessibilidade WCAG AAA (contraste 7:1)
 */
const darkBackground = {
  /** Fundo principal da aplicação - quase preto */
  body: defaultColors.grey[900],
  /** Cor para texto primário - máximo contraste */
  textPrimary: defaultColors.grey[50],
  /** Cor para texto secundário */
  textSecondary: defaultColors.grey[200],
  /** Cor para bordas e separadores */
  border: defaultColors.grey[600],
  /** Efeito ao pressionar componentes */
  button: {
    pressed: defaultColors.grey[700],
  },
};

export { darkBackground, lightBackground };
