import { dataEvents } from "@Lib/dataEvents";
import { useCallback, useEffect, useState } from "react";

export function useActionList<DataType, DataOptionProps = undefined>(
  action: (data?: DataOptionProps) => Promise<DataType>,
  options?: DataOptionProps,
) {
  const [data, setData] = useState<DataType>([] as DataType);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const result = await action(options);
    setData(result);
    setLoading(false);
  }, [action, options]);

  useEffect(() => {
    load();

    const unsubscribe = dataEvents.subscribe(load);
    return unsubscribe;
  }, [load]);

  return {
    data,
    loading,
    reload: load,
  };
}
