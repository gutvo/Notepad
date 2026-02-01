import { dataEvents } from "@Lib/dataEvents";
import { useCallback, useEffect, useState } from "react";

export function useActionList<DataType>(action: () => Promise<DataType>) {
  const [data, setData] = useState<DataType>([] as DataType);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const result = await action();
    setData(result);
    setLoading(false);
  }, [action]);

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
