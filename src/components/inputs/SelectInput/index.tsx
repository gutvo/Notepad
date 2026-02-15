import BaseSelectInput, {
  BaseSelectInputProps,
} from "@Components/BaseSelectInput";
import BaseTypography from "@Components/BaseTypography";
import useTheme from "@Hooks/useTheme";
import { ReactNode } from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

interface SelectInputProps<DataProps, ValueProps> extends BaseSelectInputProps<
  DataProps,
  ValueProps
> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  error?: boolean;
  helpText?: string;
  helpTextStyle?: StyleProp<TextStyle>;
}

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
  ...rest
}: SelectInputProps<DataProps, ValueProps>) {
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
            borderRadius: 4,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: theme.spacing(2),
            height: 48,
            backgroundColor: theme.palette.background.body,
            borderColor: theme.palette.background.border,
          },
          containerStyle,
        ]}
      >
        {startIcon}

        <BaseSelectInput {...rest} />

        {endIcon}
      </View>

      {helpText && (
        <Text
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
        </Text>
      )}
    </View>
  );
}
