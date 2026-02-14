const spacingConfig = 4;

export default function spacing(size: number) {
  return spacingConfig * size;
}

export type SpacingFunctionProps = typeof spacing;
