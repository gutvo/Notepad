const spacingConfig = 4;

export default function fontSize(size: number) {
  return spacingConfig * size;
}

export type FontSizeFunctionProps = typeof fontSize;
