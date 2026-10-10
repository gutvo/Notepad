import BaseInputWrapper, {
  BaseInputWrapperProps,
} from "@Components/bases/InputWrapper";
import useTheme from "@Hooks/useTheme";
import { useState } from "react";
import {
  TextInputProps as ReactTextInputProps,
  TextInput as ReactTextIput,
} from "react-native";

interface TextInputProps
  extends Omit<ReactTextInputProps, "onChange">, BaseInputWrapperProps {
  disabled?: boolean;
}

export default function TextInput({
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
}: TextInputProps) {
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
    disabled,
  };

  return (
    <BaseInputWrapper {...wrapperProps}>
      <ReactTextIput
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
