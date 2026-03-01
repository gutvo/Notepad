import BaseInputWrapper, {
  BaseInputWrapperProps,
} from "@Components/bases/InputWrapper";
import useTheme from "@Hooks/useTheme";
import { useState } from "react";
import { TextInput, TextInputProps } from "react-native";

interface TextFieldProps
  extends Omit<TextInputProps, "onChange">, BaseInputWrapperProps {
  disabled?: boolean;
}

export default function TextField({
  endIcon,
  startIcon,
  label,
  onFocus,
  onBlur,
  style,
  containerStyle,
  textStyle,
  helpText,
  error,
  helpTextStyle,
  children,
  disabled,
  required,
  ...rest
}: TextFieldProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  const wrapperProps = {
    containerStyle,
    endIcon,
    error,
    helpText,
    helpTextStyle,
    label,
    startIcon,
    textStyle,
    focused: focused,
    required,
  };

  return (
    <BaseInputWrapper {...wrapperProps}>
      <TextInput
        style={[{ flex: 1, color: theme.palette.text.primary }, style]}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        placeholderTextColor={theme.palette.text.placeholder}
        editable={!disabled}
        selectTextOnFocus={!disabled}
        {...rest}
      />
    </BaseInputWrapper>
  );
}
