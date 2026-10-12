import createTheme from "@Utils/theme/createTheme";
import defaultColors from "./defaultColors";

const themeIndigo = createTheme(defaultColors.indigoGrey);
const themePurple = createTheme(defaultColors.purpleGrey);
const themeBlue = createTheme(defaultColors.blueGrey);
const themeGreen = createTheme(defaultColors.greenGrey);
const themeTeal = createTheme(defaultColors.tealGrey);
const themeRed = createTheme(defaultColors.redGrey);
const themeCyan = createTheme(defaultColors.cyanGrey);
const themePink = createTheme(defaultColors.pinkGrey);
const themeAmber = createTheme(defaultColors.amberGrey);
const themeOrange = createTheme(defaultColors.orangeGrey);

const themes = [
  { name: "modals.theme.options.indigo", palette: themeIndigo },
  { name: "modals.theme.options.purple", palette: themePurple },
  { name: "modals.theme.options.blue", palette: themeBlue },
  { name: "modals.theme.options.green", palette: themeGreen },
  { name: "modals.theme.options.teal", palette: themeTeal },
  { name: "modals.theme.options.red", palette: themeRed },
  { name: "modals.theme.options.cyan", palette: themeCyan },
  { name: "modals.theme.options.pink", palette: themePink },
  { name: "modals.theme.options.amber", palette: themeAmber },
  { name: "modals.theme.options.orange", palette: themeOrange },
] as const;

export { themes };
