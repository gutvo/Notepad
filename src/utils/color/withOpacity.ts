/**
 * Converte uma cor hexadecimal para rgba com a opacidade informada.
 */
export default function withOpacity(color: string, opacity: number): string {
  if (!/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(color)) {
    throw new Error(`Cor hexadecimal inválida: ${color}`);
  }

  if (!Number.isFinite(opacity) || opacity < 0 || opacity > 1) {
    throw new Error("A opacidade deve estar entre 0 e 1.");
  }

  const hex = color.slice(1);
  const normalizedHex =
    hex.length === 3
      ? hex
          .split("")
          .map((digit) => digit + digit)
          .join("")
      : hex;
  const [red, green, blue] = [0, 2, 4].map((index) =>
    Number.parseInt(normalizedHex.slice(index, index + 2), 16),
  );

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}
