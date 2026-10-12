import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import React, { useState } from "react";
import { Animated, View } from "react-native";
import useCalculateDimensions from "./useCalculateDimensions";

import BaseButton from "@Components/bases/Button";
import BaseIcon from "../Icon";
import useAnimation from "./useAnimation";

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

  const [internalIsEnabled, setInternalIsEnabled] = useState(value ?? false);
  const isEnabled = value ?? internalIsEnabled;

  const dimensions = useCalculateDimensions({
    height,
    width,
  });

  const { backgroundColor, translateX } = useAnimation({
    internalIsEnabled: isEnabled,
    thumbWidth: dimensions.thumbWidth,
    trackWidth: dimensions.trackWidth,
  });

  function handleChangeIsEnabled() {
    if (disabled) return;

    if (onChange) {
      onChange(!isEnabled);
      return;
    }

    setInternalIsEnabled(!isEnabled);
  }

  return (
    <View>
      {label && (
        <BaseTypography
          variant="BODY2"
          style={{
            color: theme.palette.text.primary,
            marginBottom: theme.spacing(dimensions.labelMarginBottom),
          }}
        >
          {label}
        </BaseTypography>
      )}

      <BaseButton onPress={handleChangeIsEnabled} disabled={disabled}>
        <Animated.View
          style={{
            width: dimensions.trackWidth,
            height: dimensions.trackHeight,
            borderRadius: dimensions.trackRadius,
            backgroundColor,
          }}
        >
          <Animated.View
            style={{
              backgroundColor: isEnabled
                ? theme.palette.primary.dark
                : theme.palette.grey[700],
              height: dimensions.thumbHeight,
              width: dimensions.thumbWidth,
              borderRadius: dimensions.thumbRadius,
              position: "absolute",
              top: dimensions.thumbTop,
              transform: [{ translateX }],
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isEnabled && enableIconName ? (
              <BaseIcon
                name={enableIconName}
                size={dimensions.iconSize}
                color={theme.palette.primary.contrast}
              />
            ) : !isEnabled && disableIconName ? (
              <BaseIcon
                name={disableIconName}
                size={dimensions.iconSize}
                color={theme.palette.primary.contrast}
              />
            ) : null}
          </Animated.View>
        </Animated.View>
      </BaseButton>
    </View>
  );
}
