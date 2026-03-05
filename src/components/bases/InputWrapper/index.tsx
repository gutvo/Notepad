import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import { ReactNode } from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";

export interface BaseInputWrapperProps {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  error?: boolean;
  helpText?: string;
  helpTextStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
  focused?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export default function BaseInputWrapper({
  endIcon,
  startIcon,
  label,
  containerStyle,
  textStyle,
  helpText,
  error,
  helpTextStyle,
  children,
  focused,
  required,
  disabled,
}: BaseInputWrapperProps) {
  const theme = useTheme();

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
              color: focused
                ? theme.palette.primary.main
                : theme.palette.text.primary,
              zIndex: 1,
              opacity: disabled ? 0.5 : 1,
            },
            textStyle,
          ]}
        >
          {required ? label + "*" : label}
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
            opacity: disabled ? 0.5 : 1,
          },
          containerStyle,
        ]}
      >
        {startIcon}

        {children}

        {endIcon}
      </View>

      {helpText && (
        <BaseTypography
          variant="BODY2"
          style={[
            {
              paddingHorizontal: theme.spacing(1),
              color: error
                ? theme.palette.error.main
                : theme.palette.text.primary,
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
