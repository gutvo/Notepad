import { formatDate } from "date-fns";

export default function getFormattedDate(
  date: string | number | Date,
  type: "DATE" | "DATETIME",
) {
  const format = type === "DATE" ? "dd/MM/yyyy" : "dd/MM/yyyy HH:mm";

  const formattedDate = formatDate(date, format);

  return formattedDate;
}
