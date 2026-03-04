import roundToFive from "./roundToFive";

interface GetIsDisabledPastProps {
  number: number;
  disabledPast: boolean;
  isToday: boolean;
  mode: BaseClockModeProps;
  now: Date;
  time: BaseClockTimeValueProps;
}

export default function getIsDisabledPast({
  disabledPast,
  isToday,
  mode,
  number,
  now,
  time,
}: GetIsDisabledPastProps) {
  if (!disabledPast || !isToday) return false;

  if (mode === "hour") {
    return number < now.getHours();
  }

  // minuto
  if (time.hour === now.getHours()) {
    return number < roundToFive(now.getMinutes());
  }

  if (time.hour < now.getHours()) {
    return true;
  }

  return false;
}
