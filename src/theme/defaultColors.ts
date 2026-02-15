/**
 * Cores padrão do projeto
 * Definições base para status e escala de cinza
 */
const defaultColors = {
  /**
   * Cor informativa
   * @usage Toast de informação, indicadores de status
   */
  info: {
    main: "#0ea5e9",
  },
  /**
   * Cor de sucesso
   * @usage Toast de sucesso, validações
   */
  success: {
    main: "#0ea85c",
  },
  /**
   * Cor de aviso
   * @usage Toast de aviso, alertas não-críticos
   */
  warning: {
    main: "#ffa800",
  },
  /**
   * Cor de erro
   * @usage Validações, erros, toasts de erro
   */
  error: {
    main: "#cc2424",
  },
  /**
   * Escala de cinza do projeto
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
   * Cores comuns
   */
  common: {
    black: "#000000",
  },
};

export type DefaultColorProps = typeof defaultColors;

export default defaultColors;
