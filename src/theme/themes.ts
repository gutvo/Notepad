import createTheme from "@Utils/theme/createTheme";
import defaultColors from "./defaultColors";

const themeIndigo = createTheme(defaultColors.indigoGrey);
const themePurple = createTheme(defaultColors.purpleGrey);
const themeBlue = createTheme(defaultColors.blueGrey);
const themeGreen = createTheme(defaultColors.greenGrey);
const themeTeal = createTheme(defaultColors.tealGrey);
const themeRed = createTheme(defaultColors.redGrey);

const themes = [
  themeIndigo,
  themePurple,
  themeBlue,
  themeGreen,
  themeTeal,
  themeRed,
];

export { themes };
