function formatValues(data: ConfigDataProps) {
  if (data.type === "STRING") return data.value;

  if (data.type === "NUMBER") return Number(data.value);

  if (data.type === "BOOLEAN") return data.value === "true";
}

export default function _formatConfigData(data: ConfigDataProps) {
  return {
    ...data,
    value: formatValues(data),
  };
}
