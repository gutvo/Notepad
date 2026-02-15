interface FormatDataProps {
  key: keyof ConfigValueMapProps;
  type: ConfigTypeProps;
  value: string;
}

export default function _formatData(data: FormatDataProps): ConfigDataProps {
  let formattedValue: any;

  if (data.type === "STRING") formattedValue = data.value;
  if (data.type === "NUMBER") formattedValue = Number(data.value);
  if (data.type === "BOOLEAN") formattedValue = data.value === "true";

  return {
    ...data,
    value: formattedValue,
  };
}
