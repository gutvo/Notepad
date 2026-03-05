import useTheme from "@Hooks/useTheme";
import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import BaseDivider from "../Divider";
import BaseTypography, { BaseTypographyProps } from "../Typography";

export interface BaseListItemProps {
  name: string | number;
  description?: string | number;

  Left?: ReactNode;
  Right?: ReactNode;

  showDivider?: boolean;
  style?: ViewStyle;

  children?: ReactNode;

  nameProps?: BaseTypographyProps;
  descriptionProps?: BaseTypographyProps;
}

export default function BaseListItem({
  name,
  description,
  Left,
  Right,
  showDivider = true,
  style,
  children,
  nameProps,
  descriptionProps,
}: BaseListItemProps) {
  const theme = useTheme();

  return (
    <>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: theme.spacing(4),
            paddingHorizontal: theme.spacing(4),
          },
          style,
        ]}
      >
        {Left}

        <View style={{ flex: 1 }}>
          <BaseTypography {...nameProps}>{name}</BaseTypography>

          {description && (
            <BaseTypography variant="BODY2" {...descriptionProps}>
              {description}
            </BaseTypography>
          )}

          {children}
        </View>

        {Right}
      </View>

      {showDivider && <BaseDivider />}
    </>
  );
}
