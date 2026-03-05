import BaseIcon from "@Components/bases/Icon";
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
  disabled,
  ...rest
}: SelectInputProps<DataProps, ValueProps>) {
  const wrapperProps = {
    containerStyle,
    endIcon: endIcon || (
      <BaseIcon
        name="chevron-down"
        style={{ position: "absolute", right: 10, zIndex: 1 }}
      />
    ),
    error,
    helpText,
    helpTextStyle,
    label,
    startIcon,
    textStyle,
    required,
    disabled,
  };

  return (
    <BaseInputWrapper {...wrapperProps}>
      <BaseSelectInput disabled={disabled} {...rest} />
    </BaseInputWrapper>
  );
}
