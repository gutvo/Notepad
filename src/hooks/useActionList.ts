import { useCallback, useEffect, useState } from "react";
import { Observable, Subscription } from "rxjs";

interface ActionListStructure<DataType, Options> {
  list: (options?: Options) => Promise<DataType>;
  observer?: Observable<any>;
}

interface UseActionListProps<DataType, Options, ResultType = DataType> {
  actions: ActionListStructure<DataType, Options>;
  options?: Options;
  format?: (data: DataType) => Promise<ResultType>;
}

export function useActionList<
  DataType,
  Options = undefined,
  ResultType = DataType,
>({
  actions,
  options,
  format,
}: UseActionListProps<DataType, Options, ResultType>) {
  const [data, setData] = useState<ResultType>([] as ResultType);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    const normalizedOptions =
      options && typeof options === "object"
        ? Object.entries(options as Record<string, any>).reduce(
            (accumulator, [key, value]) => {
              if (value === undefined || value === null) return accumulator;

              if (typeof value === "string" && value.trim() === "") {
                return accumulator;
              }

              if (Array.isArray(value) && value.length === 0) {
                return accumulator;
              }

              if (
                typeof value === "object" &&
                !Array.isArray(value) &&
                Object.values(value as Record<string, any>).every(
                  (nestedValue) =>
                    nestedValue === undefined ||
                    nestedValue === null ||
                    (typeof nestedValue === "string" &&
                      nestedValue.trim() === "") ||
                    (Array.isArray(nestedValue) && nestedValue.length === 0),
                )
              ) {
                return accumulator;
              }

              accumulator[key] = value;
              return accumulator;
            },
            {} as Record<string, any>,
          )
        : undefined;

    const result = await actions.list(
      normalizedOptions && Object.keys(normalizedOptions).length
        ? (normalizedOptions as Options)
        : undefined,
    );

    const formatted = format
      ? await format(result)
      : (result as unknown as ResultType);

    setData(formatted);
    setLoading(false);
  }, [actions, options, format]);

  useEffect(() => {
    load();

    let subscription: Subscription | undefined;

    if (actions.observer) {
      subscription = actions.observer.subscribe(() => {
        load();
      });
    }

    return () => subscription?.unsubscribe();
  }, [load, actions]);

  return { data, loading, reload: load };
}
