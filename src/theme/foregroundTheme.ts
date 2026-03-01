import defaultColors from "./defaultColors";

const lightForeground = {
  text: {
    primary: defaultColors.grey[900],
    secondary: defaultColors.grey[700],
    placeholder: "rgba(0, 0, 0, 0.4)",
  },
  action: {
    pressed: defaultColors.grey[200],
  },
};

const darkForeground = {
  text: {
    primary: defaultColors.grey[50],
    secondary: defaultColors.grey[200],
    placeholder: "rgba(255, 255, 255, 0.4)",
  },
  action: {
    pressed: defaultColors.grey[700],
  },
};

export { darkForeground, lightForeground };
