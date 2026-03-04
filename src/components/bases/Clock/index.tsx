import useTheme from "@Hooks/useTheme";
import { useState } from "react";
import { View } from "react-native";
import Number from "./Number";
import Pointer from "./Pointer";
import roundToFive from "./roundToFive";

interface BaseClockProps {
  size?: number;
  value?: BaseClockTimeValueProps;
  onChange?: (value: BaseClockTimeValueProps) => void;
  disabledPast?: boolean;
  referenceDate?: Date;
}

export default function BaseClock({
  size = 350,
  value,
  onChange,
  disabledPast,
  referenceDate,
}: BaseClockProps) {
  const theme = useTheme();

  const [mode, setMode] = useState<BaseClockModeProps>("hour");

  const now = new Date();

  const isToday =
    referenceDate && now.toDateString() === referenceDate.toDateString();

  const [internal, setInternal] = useState<BaseClockTimeValueProps>({
    hour: now.getHours(),
    minute: roundToFive(now.getMinutes()),
  });

  const time = value ?? internal;

  function update(partial: Partial<BaseClockTimeValueProps>) {
    const updated = { ...time, ...partial };
    if (onChange) {
      onChange(updated);
    } else {
      setInternal(updated);
    }
  }

  const center = size / 2;
  const outerRadius = size / 2 - size * 0.1;
  const innerRadius = size / 2 - size * 0.25;

  const outerHours = Array.from({ length: 12 }, (_, i) => i + 1);
  const innerHours = [0, ...Array.from({ length: 11 }, (_, i) => i + 13)];

  const minuteNumbers = Array.from({ length: 12 }, (_, i) => i * 5);

  const selected = mode === "hour" ? time.hour : time.minute;

  function handleSelect(number: number) {
    if (mode === "hour") {
      update({ hour: number });
      setMode("minute");
    } else {
      update({ minute: number });
    }
  }

  function getIsDisabledPastByNumber(number: number) {
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

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.palette.background.card,
        }}
      >
        {mode === "hour" ? (
          <>
            {outerHours.map((num, index) => (
              <Number
                key={`outer-${num}`}
                number={num}
                index={index}
                total={12}
                radius={outerRadius}
                center={center}
                onPress={handleSelect}
                selected={selected}
                getIsDisabledPastByNumber={getIsDisabledPastByNumber}
              />
            ))}

            {innerHours.map((num, index) => (
              <Number
                key={`inner-${num}`}
                number={num}
                index={index}
                total={12}
                radius={innerRadius}
                center={center}
                onPress={handleSelect}
                selected={selected}
                getIsDisabledPastByNumber={getIsDisabledPastByNumber}
              />
            ))}
          </>
        ) : (
          minuteNumbers.map((num, index) => (
            <Number
              key={`minute-${num}`}
              number={num}
              index={index}
              total={12}
              radius={outerRadius}
              center={center}
              onPress={handleSelect}
              selected={selected}
              getIsDisabledPastByNumber={getIsDisabledPastByNumber}
            />
          ))
        )}

        <Pointer
          selected={selected}
          mode={mode}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
        />
      </View>
    </View>
  );
}
