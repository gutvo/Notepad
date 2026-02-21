import BaseInputWrapper, {
  BaseInputWrapperProps,
} from "@Components/bases/InputWrapper";
import BaseSelectInput, {
  BaseSelectInputProps,
} from "@Components/bases/SelectInput";

interface SelectInputProps<DataProps, ValueProps>
  extends BaseSelectInputProps<DataProps, ValueProps>, BaseInputWrapperProps {}

export default function SelectInput<
  DataProps,
  ValueProps extends BaseSelectValueProps,
>({
  endIcon,
  startIcon,
  label,
  containerStyle,
  textStyle,
  helpText,
  error,
  helpTextStyle,
  required,
  ...rest
}: SelectInputProps<DataProps, ValueProps>) {
  const wrapperProps = {
    containerStyle,
    endIcon,
    error,
    helpText,
    helpTextStyle,
    label,
    startIcon,
    textStyle,
    required,
  };

  return (
    <BaseInputWrapper {...wrapperProps}>
      <BaseSelectInput {...rest} />
    </BaseInputWrapper>
  );
}
