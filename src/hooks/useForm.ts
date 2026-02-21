import isEqual from "fast-deep-equal";
import { useEffect, useRef } from "react";
import {
  DefaultValues,
  FieldValues,
  UseFormProps,
  useForm as useHookForm,
} from "react-hook-form";

interface UseFormOptionsProps<DataProps extends FieldValues> extends Omit<
  UseFormProps<DataProps>,
  "defaultValues"
> {
  defaultValues: DefaultValues<DataProps>;
}

export default function useForm<DataProps extends FieldValues>(
  options: UseFormOptionsProps<DataProps>,
) {
  const form = useHookForm<DataProps>(options);

  const previousValues = useRef(options.defaultValues);

  useEffect(() => {
    if (
      options.defaultValues &&
      !isEqual(previousValues.current, options.defaultValues)
    ) {
      form.reset(options.defaultValues);
      previousValues.current = options.defaultValues;
    }
  }, [options.defaultValues, form.reset, form]);

  return form;
}
