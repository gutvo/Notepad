import defaultColors from "./defaultColors";

/**
 * Temas de cores primárias disponíveis
 * Cada tema fornece variações: light, main, dark e contrast
 *
 * Uso: O usuário pode selecionar um destes temas como cor primária da aplicação
 * Cores otimizadas para acessibilidade WCAG AA (contraste 4.5:1)
 * Cada tema utiliza sua escala de cinza tintada para coerência visual
 *
 * Futuro: Considere criar "temas recomendados" se necessário reduzir opções
 */

const themeBlue = {
  light: defaultColors.blueGrey[200],
  main: defaultColors.blueGrey[600],
  dark: defaultColors.blueGrey[900],
  contrast: defaultColors.grey[50],
};

const themePurple = {
  light: defaultColors.purpleGrey[200],
  main: defaultColors.purpleGrey[600],
  dark: defaultColors.purpleGrey[900],
  contrast: defaultColors.grey[50],
};

const themeGreen = {
  light: defaultColors.greenGrey[200],
  main: defaultColors.greenGrey[600],
  dark: defaultColors.greenGrey[900],
  contrast: defaultColors.grey[50],
};

const themeRed = {
  light: defaultColors.redGrey[200],
  main: defaultColors.redGrey[600],
  dark: defaultColors.redGrey[900],
  contrast: defaultColors.grey[50],
};

const themeOrange = {
  light: defaultColors.orangeGrey[200],
  main: defaultColors.orangeGrey[600],
  dark: defaultColors.orangeGrey[900],
  contrast: defaultColors.grey[50],
};

const themeTeal = {
  light: defaultColors.tealGrey[200],
  main: defaultColors.tealGrey[600],
  dark: defaultColors.tealGrey[900],
  contrast: defaultColors.grey[50],
};

const themePink = {
  light: defaultColors.pinkGrey[200],
  main: defaultColors.pinkGrey[600],
  dark: defaultColors.pinkGrey[900],
  contrast: defaultColors.grey[50],
};

const themeIndigo = {
  light: defaultColors.indigoGrey[200],
  main: defaultColors.indigoGrey[600],
  dark: defaultColors.indigoGrey[900],
  contrast: defaultColors.grey[50],
};

const themeAmber = {
  light: defaultColors.amberGrey[200],
  main: defaultColors.amberGrey[600],
  dark: defaultColors.amberGrey[900],
  contrast: defaultColors.grey[50],
};

const themeViolet = {
  light: defaultColors.violetGrey[200],
  main: defaultColors.violetGrey[600],
  dark: defaultColors.violetGrey[900],
  contrast: defaultColors.grey[50],
};

const themeCyan = {
  light: defaultColors.cyanGrey[200],
  main: defaultColors.cyanGrey[600],
  dark: defaultColors.cyanGrey[900],
  contrast: defaultColors.grey[50],
};

const themeSlate = {
  light: defaultColors.slateGrey[200],
  main: defaultColors.slateGrey[600],
  dark: defaultColors.slateGrey[900],
  contrast: defaultColors.grey[50],
};

const themeZinc = {
  light: defaultColors.zincGrey[200],
  main: defaultColors.zincGrey[600],
  dark: defaultColors.zincGrey[900],
  contrast: defaultColors.grey[50],
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
  themeAmber,
  themeViolet,
  themeCyan,
  themeSlate,
  themeZinc,
];

export { themes };
