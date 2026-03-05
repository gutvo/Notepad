import defaultColors from "@Theme/defaultColors";

export default function createTheme(colorScale: any) {
  const main = colorScale[600];

  return {
    light: colorScale[200],
    main,
    dark: colorScale[900],
    contrast: defaultColors.grey[50],
  };
}
