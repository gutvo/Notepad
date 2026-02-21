import BaseDatePicker, {
  BaseDatePickerProps,
} from "@Components/bases/DatePicker";
import BaseIcon from "@Components/bases/Icon";
import BaseInputWrapper, {
  BaseInputWrapperProps,
} from "@Components/bases/InputWrapper";

interface DatePickerProps extends BaseDatePickerProps, BaseInputWrapperProps {}

export default function DatePicker({
  containerStyle,
  endIcon,
  error,
  helpText,
  helpTextStyle,
  label,
  startIcon,
  textStyle,
  required,
  ...rest
}: DatePickerProps) {
  const wrapperProps = {
    containerStyle,
    endIcon: endIcon ?? (
      <BaseIcon
        name="calendar-outline"
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
  };

  return (
    <BaseInputWrapper {...wrapperProps}>
      <BaseDatePicker {...rest} />
    </BaseInputWrapper>
  );
}
