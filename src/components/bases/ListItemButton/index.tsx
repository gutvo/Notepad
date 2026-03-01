import useTheme from "@Hooks/useTheme";
import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import BaseButton from "../Button";
import BaseDivider from "../Divider";
import BaseTypography, { BaseTypographyProps } from "../Typography";

export interface BaseListItemButtonProps {
  label: string;
  description?: string;

  Left?: ReactNode;
  Right?: ReactNode;

  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;

  showDivider?: boolean;

  style?: ViewStyle;
  children?: ReactNode;

  nameProps?: BaseTypographyProps;
  descriptionProps?: BaseTypographyProps;
}

export default function BaseListItemButton({
  label,
  description,
  Left,
  Right,
  onPress,
  onLongPress,
  disabled,
  showDivider = true,
  style,
  children,
  nameProps,
  descriptionProps,
}: BaseListItemButtonProps) {
  const theme = useTheme();

  return (
    <>
      <BaseButton
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
        style={({ pressed }) => [
          {
            paddingVertical: theme.spacing(4),
            paddingHorizontal: theme.spacing(4),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: disabled ? 0.5 : 1,
          },
          pressed && {
            backgroundColor: theme.palette.background.button.pressed,
          },
          style,
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing(4),
            flex: 1,
          }}
        >
          {Left}

          <View style={{ flex: 1 }}>
            <BaseTypography {...nameProps}>{label}</BaseTypography>

            {description && (
              <BaseTypography variant="BODY2" {...descriptionProps}>
                {description}
              </BaseTypography>
            )}

            {children}
          </View>
        </View>

        {Right}
      </BaseButton>

      {showDivider && <BaseDivider />}
    </>
  );
}
