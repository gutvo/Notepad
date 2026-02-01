export default function getDefaultValues(configs?: ConfigDataProps[]) {
  const findConfig = configs?.find(({ key }) => key === "TEXT_FONT_SIZE");

  const formattedTextFontSize = (findConfig?.value as number) ?? 16;

  const defaultValues = {
    textFontSize: formattedTextFontSize,
  };

  return defaultValues;
}

export type ConfigDefaultValueProps = Awaited<
  ReturnType<typeof getDefaultValues>
>;
