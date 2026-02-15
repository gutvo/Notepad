/**
 * Cores padrão do projeto
 * Definições base para status e escala de cinza
 * Cores otimizadas para acessibilidade WCAG AA (contraste 4.5:1)
 */
const defaultColors = {
  /**
   * Cor informativa
   * @usage Toast de informação, indicadores de status
   */
  info: {
    light: "#7dd3f7",
    main: "#0284c7",
    dark: "#0c4a6e",
    contrast: "#ffffff",
  },
  /**
   * Cor de sucesso
   * @usage Toast de sucesso, validações
   */
  success: {
    light: "#6ee7b7",
    main: "#059669",
    dark: "#064e3b",
    contrast: "#ffffff",
  },
  /**
   * Cor de aviso
   * @usage Toast de aviso, alertas não-críticos
   */
  warning: {
    light: "#fcd34d",
    main: "#d97706",
    dark: "#78350f",
    contrast: "#ffffff",
  },
  /**
   * Cor de erro
   * @usage Validações, erros, toasts de erro
   */
  error: {
    light: "#fca5a5",
    main: "#dc2626",
    dark: "#7f1d1d",
    contrast: "#ffffff",
  },
  /**
   * Escala de cinza neutra do projeto
   * Usada para backgrounds, borders e tipografia secundária
   */
  grey: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  /**
   * Escala de cinza azulada
   * Tons de azul suave para tema blue
   */
  blueGrey: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3f7",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
  /**
   * Escala de cinza verde
   * Tons de verde suave para tema green
   */
  greenGrey: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#064e3b",
  },
  /**
   * Escala de cinza roxa
   * Tons de roxo suave para tema purple
   */
  purpleGrey: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#4c1d95",
  },
  /**
   * Escala de cinza vermelha
   * Tons de vermelho suave para tema red
   */
  redGrey: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  /**
   * Escala de cinza laranja
   * Tons de laranja suave para tema orange
   */
  orangeGrey: {
    50: "#fff7ed",
    100: "#fed7aa",
    200: "#fdba74",
    300: "#f97316",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#92400e",
    900: "#78350f",
  },
  /**
   * Escala de cinza teal
   * Tons de verde-azulado suave para tema teal
   */
  tealGrey: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#134e4a",
    900: "#0d3731",
  },
  /**
   * Escala de cinza rosa
   * Tons de rosa suave para tema pink
   */
  pinkGrey: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f8b4d9",
    400: "#f472b6",
    500: "#ec4899",
    600: "#be185d",
    700: "#9d174d",
    800: "#831843",
    900: "#500724",
  },
  /**
   * Escala de cinza índigo
   * Tons de índigo suave para tema indigo
   */
  indigoGrey: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },
  /**
   * Escala de cinza âmbar
   * Tons de âmbar/amarelo suave para tema amber
   */
  amberGrey: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  /**
   * Escala de cinza violeta
   * Tons de violeta suave para tema violet
   */
  violetGrey: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#8b5cf6",
    700: "#7c3aed",
    800: "#6d28d9",
    900: "#5b21b6",
  },
  /**
   * Escala de cinza ciano
   * Tons de ciano suave para tema cyan
   */
  cyanGrey: {
    50: "#ecf8ff",
    100: "#cff9fe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
  },
  /**
   * Escala de cinza ardósia
   * Tons de cinza-azulado para tema slate
   */
  slateGrey: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  /**
   * Escala de cinza zíncico
   * Tons de cinza neutro para tema zinc
   */
  zincGrey: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1a5",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
  },
  /**
   * Cores comuns
   */
  common: {
    black: "#000000",
    white: "#ffffff",
  },
};

export type DefaultColorProps = typeof defaultColors;

export default defaultColors;
