import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import React from "react";
import { View } from "react-native";
import useCalculateDimensions from "./useCalculateDimensions";

import BaseButton from "@Components/bases/Button";
import BaseIcon from "@Components/bases/Icon";

interface BaseSwitchProps {
  label?: string;
  enableIconName?: BaseIconNameProps;
  disableIconName?: BaseIconNameProps;
  width?: number;
  height?: number;
  value?: boolean;
  onChange?: (check: boolean) => void;
  disabled?: boolean;
}

export default function BaseSwitch({
  label,
  enableIconName,
  disableIconName,
  width = 72,
  height = 28,
  value,
  onChange,
  disabled,
}: BaseSwitchProps) {
  const theme = useTheme();

  const dimensions = useCalculateDimensions({
    height,
    width,
  });

  function handleChangeIsEnabled() {
    if (disabled) return;

    onChange?.(!value);
  }

  return (
    <View>
      {label && (
        <BaseTypography
          variant="BODY2"
          style={{
            color: theme.palette.background.textPrimary,
            marginBottom: theme.spacing(dimensions.labelMarginBottom),
          }}
        >
          {label}
        </BaseTypography>
      )}

      <BaseButton onPress={handleChangeIsEnabled} disabled={disabled}>
        <View
          style={{
            width: dimensions.trackWidth,
            height: dimensions.trackHeight,
            borderRadius: dimensions.trackRadius,
            backgroundColor: value
              ? theme.palette.primary.light
              : theme.palette.isDarkMode
                ? theme.palette.grey[800]
                : theme.palette.grey[200],
            justifyContent: value ? "flex-start" : "flex-end",
            display: "flex",
          }}
        >
          <View
            style={{
              backgroundColor: value
                ? theme.palette.primary.dark
                : theme.palette.grey[700],
              height: dimensions.thumbHeight,
              width: dimensions.thumbWidth,
              borderRadius: dimensions.thumbRadius,
              position: "absolute",
              top: dimensions.thumbTop,
              left: value ? dimensions.trackWidth - dimensions.thumbWidth : 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {value && enableIconName ? (
              <BaseIcon
                name={enableIconName}
                size={dimensions.iconSize}
                color={theme.palette.primary.contrast}
              />
            ) : !value && disableIconName ? (
              <BaseIcon
                name={disableIconName}
                size={dimensions.iconSize}
                color={theme.palette.primary.contrast}
              />
            ) : null}
          </View>
        </View>
      </BaseButton>
    </View>
  );
}
