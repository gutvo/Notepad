import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import { ReactNode, useState } from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface TextFieldProps extends TextInputProps {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  error?: boolean;
  helpText?: string;
  helpTextStyle?: StyleProp<TextStyle>;
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
  ...rest
}: TextFieldProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ marginTop: theme.spacing(3) }}>
      {label && (
        <BaseTypography
          variant="BODY2"
          style={[
            {
              position: "absolute",
              top: -10,
              left: 12,
              paddingHorizontal: theme.spacing(1),
              backgroundColor: theme.palette.background.body,
              color: theme.palette.background.border,
              zIndex: 1,
            },
            textStyle,
          ]}
        >
          {label}
        </BaseTypography>
      )}

      <View
        style={[
          {
            borderWidth: 1,
            borderColor: focused
              ? theme.palette.primary.main
              : theme.palette.background.border,
            borderRadius: 4,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: theme.spacing(2),
            height: 48,
          },
          containerStyle,
        ]}
      >
        {startIcon}

        <TextInput
          style={[{ flex: 1, paddingHorizontal: theme.spacing(2) }, style]}
          onFocus={(event) => {
            onFocus?.(event);
            setFocused(true);
          }}
          onBlur={(event) => {
            onBlur?.(event);
            setFocused(false);
          }}
          {...rest}
        />

        {endIcon}
      </View>

      {helpText && (
        <BaseTypography
          style={[
            {
              color: error
                ? theme.palette.error.main
                : theme.palette.background.textPrimary,
            },
            helpTextStyle,
          ]}
        >
          {helpText}
        </BaseTypography>
      )}
    </View>
  );
}
