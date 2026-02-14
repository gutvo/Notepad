export default function getDefaultValues() {
  const defaultValues = {
    themeIndex: 0,
  };

  return defaultValues;
}

export type ThemeDefaultValueProps = Awaited<
  ReturnType<typeof getDefaultValues>
>;
