const defaultColors = {
  info: {
    light: "#67c4e8",
    main: "#0369a1",
    dark: "#083344",
    contrast: "#ffffff",
  },

  success: {
    light: "#4fd1a1",
    main: "#047857",
    dark: "#052e26",
    contrast: "#ffffff",
  },

  warning: {
    light: "#fbbf24",
    main: "#b45309",
    dark: "#451a03",
    contrast: "#ffffff",
  },

  error: {
    light: "#f87171",
    main: "#b91c1c",
    dark: "#450a0a",
    contrast: "#ffffff",
  },

  grey: {
    50: "#f3f4f6",
    100: "#e5e7eb",
    200: "#d1d5db",
    300: "#9ca3af",
    400: "#6b7280",
    500: "#4b5563",
    600: "#374151",
    700: "#1f2937",
    800: "#111827",
    900: "#0b1220",
  },

  blueGrey: {
    50: "#e0f2fe",
    100: "#bae6fd",
    200: "#7dd3f7",
    300: "#38bdf8",
    400: "#0ea5e9",
    500: "#0284c7",
    600: "#0369a1",
    700: "#075985",
    800: "#0c4a6e",
    900: "#082f49",
  },

  greenGrey: {
    50: "#dcfce7",
    100: "#bbf7d0",
    200: "#86efac",
    300: "#4ade80",
    400: "#22c55e",
    500: "#16a34a",
    600: "#15803d",
    700: "#166534",
    800: "#14532d",
    900: "#052e16",
  },

  purpleGrey: {
    50: "#f3e8ff",
    100: "#e9d5ff",
    200: "#d8b4fe",
    300: "#c084fc",
    400: "#a855f7",
    500: "#9333ea",
    600: "#7e22ce",
    700: "#6b21a8",
    800: "#581c87",
    900: "#3b0764",
  },

  redGrey: {
    50: "#fee2e2",
    100: "#fecaca",
    200: "#fca5a5",
    300: "#f87171",
    400: "#ef4444",
    500: "#dc2626",
    600: "#b91c1c",
    700: "#991b1b",
    800: "#7f1d1d",
    900: "#450a0a",
  },

  orangeGrey: {
    50: "#fed7aa",
    100: "#fdba74",
    200: "#fb923c",
    300: "#f97316",
    400: "#ea580c",
    500: "#c2410c",
    600: "#9a3412",
    700: "#7c2d12",
    800: "#652b19",
    900: "#431407",
  },

  tealGrey: {
    50: "#ccfbf1",
    100: "#99f6e4",
    200: "#5eead4",
    300: "#2dd4bf",
    400: "#14b8a6",
    500: "#0d9488",
    600: "#0f766e",
    700: "#115e59",
    800: "#134e4a",
    900: "#042f2e",
  },

  indigoGrey: {
    50: "#e0e7ff",
    100: "#c7d2fe",
    200: "#a5b4fc",
    300: "#818cf8",
    400: "#6366f1",
    500: "#4f46e5",
    600: "#4338ca",
    700: "#3730a3",
    800: "#312e81",
    900: "#1e1b4b",
  },

  common: {
    black: "#000000",
    white: "#ffffff",
  },
};

export type DefaultColorProps = typeof defaultColors;

export default defaultColors;
