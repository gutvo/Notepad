import colors from "@Colors";
import { Picker } from "@react-native-picker/picker";
import { Key, ReactNode, Ref, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  TargetedEvent,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface OptionProps<DataProps> {
  label: string;
  value: DataProps;
}

interface SelectInputProps<DataProps> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  error?: boolean;
  helpText?: string;
  helpTextStyle?: StyleProp<TextStyle>;
  onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  style?: StyleProp<TextStyle>;
  selectedValue?: DataProps;
  onValueChange?: (itemValue: DataProps, itemIndex: number) => void;
  options: OptionProps<DataProps>[];
  ref?: Ref<Picker<DataProps>>;
  disabled?: boolean;
  placeholder?: string;
}

export default function SelectInput<DataProps>({
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
  selectedValue,
  onValueChange,
  options,
  ref,
  disabled,
  placeholder,
}: SelectInputProps<DataProps>) {
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
            // paddingHorizontal: 8,
            height: 48,
          },
          containerStyle,
        ]}
      >
        {startIcon}

        <Picker<DataProps>
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          enabled={!disabled}
          ref={ref}
          onFocus={(event) => {
            onFocus?.(event);
            setFocused(true);
          }}
          onBlur={(event) => {
            onBlur?.(event);
            setFocused(false);
          }}
          placeholder={placeholder}
          style={[{ flex: 1 }, style]}
        >
          {options.map((item) => (
            <Picker.Item
              key={item.value as Key}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>

        {endIcon}
      </View>
      <Text style={[error && { color: colors.error.main }, helpTextStyle]}>
        {helpText}
      </Text>
    </View>
  );
}
