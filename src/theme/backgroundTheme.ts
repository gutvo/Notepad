import defaultColors from "./defaultColors";

const lightBackground = {
  body: defaultColors.grey[50], // fundo principal
  textPrimary: defaultColors.grey[800], // texto principal
  textSecondary: defaultColors.grey[700], // texto secundário
  divider: defaultColors.common.black, // Divisor
  border: defaultColors.grey[500],

  button: {
    pressed: defaultColors.grey[300], // efeito ao pressionar (leve sombra sobre fundo)
  },
};

const darkBackground = {
  body: defaultColors.grey[900], // fundo principal (Material dark base)
  textPrimary: defaultColors.grey[200], // texto principal
  textSecondary: defaultColors.grey[300], // texto secundário
  divider: defaultColors.common.white, // Divisor
  border: defaultColors.grey[400],

  button: {
    pressed: defaultColors.grey[800], // efeito ao pressionar
  },
};

export { darkBackground, lightBackground };
