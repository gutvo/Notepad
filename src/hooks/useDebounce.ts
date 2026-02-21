import { useEffect, useState } from "react";

export default function useDebounce<ValueProps>(
  value: ValueProps,
  delay: number,
): ValueProps {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
