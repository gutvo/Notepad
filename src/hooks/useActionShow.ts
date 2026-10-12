import { useCallback, useEffect, useState } from "react";
import { Observable, Subscription } from "rxjs";

interface ActionShowStructure<DataType> {
  find: (id: number) => Promise<DataType | null>;
  observer?: Observable<any>;
}

interface UseActionShowProps<DataType, ResultType = DataType> {
  actions: ActionShowStructure<DataType>;
  id: number | undefined;
  format?: (data: DataType | undefined) => Promise<ResultType>;
}

export function useActionShow<DataType, ResultType = DataType>({
  actions,
  id,
  format,
}: UseActionShowProps<DataType, ResultType>) {
  const [data, setData] = useState<ResultType | undefined>();
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (): Promise<ResultType | undefined> => {
    if (!id) {
      setData(undefined);
      setLoading(false);
      return undefined;
    }

    const result = await actions.find(id);
    const formatted = format
      ? result
        ? await format(result)
        : undefined
      : (result as unknown as ResultType | undefined);

    setData(formatted);
    setLoading(false);
    return formatted;
  }, [actions, id, format]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);

      try {
        const result = await load();

        if (!isMounted) {
          return;
        }

        setData(result);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchData();

    let subscription: Subscription | undefined;

    if (actions.observer) {
      subscription = actions.observer.subscribe((event: any) => {
        if (event?.payload?.ids?.includes(id)) {
          void fetchData();
        }
      });
    }

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [actions, id, load]);

  return { data, loading, reload: load };
}
