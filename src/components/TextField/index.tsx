import colors from "@Colors";
import { ReactNode, useState } from "react";
import {
  StyleProp,
  Text,
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
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ marginTop: 12 }}>
      {label && (
        <Text
          style={[
            {
              position: "absolute",
              top: -8,
              left: 12,
              paddingHorizontal: 4,
              backgroundColor: colors.common.white,
              fontSize: 12,
              color: focused ? colors.primary.main : colors.grey[600],
              zIndex: 1,
            },
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}

      <View
        style={[
          {
            borderWidth: 1,
            borderColor: focused ? colors.primary.main : colors.grey[600],
            borderRadius: 4,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 8,
            height: 48,
          },
          containerStyle,
        ]}
      >
        {startIcon}

        <TextInput
          style={[{ flex: 1, paddingHorizontal: 8 }, style]}
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
      <Text style={[error && { color: colors.error.main }, helpTextStyle]}>
        {helpText}
      </Text>
    </View>
  );
}
