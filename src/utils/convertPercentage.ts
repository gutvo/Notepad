export type PercentageProps = `${number}%`;

export default function convertPercentage(percentage: PercentageProps): number {
  const value = Number(percentage.slice(0, -1));

  if (Number.isNaN(value) || value < 0 || value > 100) {
    throw new Error("Percentual inválido. Use valores entre 0% e 100%");
  }

  return value;
}
