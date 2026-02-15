export default function getDefaultValues(configs?: ConfigDataProps[]) {
  const defaultProps = configs?.reduce(
    (accumulator, config) => {
      if (config.key === "TEXT_FONT_SIZE") {
        accumulator.textFontSize = config.value;
      }

      return accumulator;
    },
    { textFontSize: 12 },
  );

  const defaultValues = {
    textFontSize: defaultProps?.textFontSize,
  };

  return defaultValues;
}

export type ConfigDefaultValueProps = Awaited<
  ReturnType<typeof getDefaultValues>
>;
