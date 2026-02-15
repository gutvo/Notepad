/**
 * Temas de cores primárias disponíveis
 * Cada tema fornece variações: light, main, dark e contrast
 *
 * Uso: O usuário pode selecionar um destes temas como cor primária da aplicação
 * Atualmente, todos os 8 temas estão igualmente disponíveis no seletor de temas
 *
 * Futuro: Considere criar "temas recomendados" se necessário reduzir opções
 */

const themeBlue = {
  light: "#7da3ff",
  main: "#2b67ff",
  dark: "#193d99",
  contrast: "#e5e7eb",
};

const themePurple = {
  light: "#b197fc",
  main: "#7c3aed",
  dark: "#4c1d95",
  contrast: "#f3e8ff",
};

const themeGreen = {
  light: "#86efac",
  main: "#16a34a",
  dark: "#14532d",
  contrast: "#dcfce7",
};

const themeRed = {
  light: "#fca5a5",
  main: "#dc2626",
  dark: "#7f1d1d",
  contrast: "#fee2e2",
};

const themeOrange = {
  light: "#fdba74",
  main: "#ea580c",
  dark: "#7c2d12",
  contrast: "#ffedd5",
};

const themeTeal = {
  light: "#5eead4",
  main: "#0d9488",
  dark: "#134e4a",
  contrast: "#ccfbf1",
};

const themePink = {
  light: "#f9a8d4",
  main: "#db2777",
  dark: "#831843",
  contrast: "#fce7f3",
};

const themeIndigo = {
  light: "#a5b4fc",
  main: "#4f46e5",
  dark: "#1e1b4b",
  contrast: "#e0e7ff",
};

/** Array de todos os temas disponíveis */
const themes = [
  themeBlue,
  themeGreen,
  themeIndigo,
  themeOrange,
  themePink,
  themePurple,
  themeRed,
  themeTeal,
];

export { themes };
