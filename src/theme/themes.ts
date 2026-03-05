import defaultColors from "./defaultColors";

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

const themes = [
  themeBlue,
  themeGreen,
  themeIndigo,
  themeOrange,
  themePurple,
  themeTeal,
  themeAmber,
];

export { themes };
