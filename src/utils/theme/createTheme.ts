import defaultColors from "@Theme/defaultColors";

type ColorScale = Record<keyof typeof defaultColors.indigoGrey, string>;

export default function createTheme(colorScale: ColorScale) {
  const main = colorScale[600];

  return {
    light: colorScale[200],
    main,
    dark: colorScale[900],
    contrast: defaultColors.grey[50],
  };
}
