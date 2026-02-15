import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import React from "react";
import { View } from "react-native";
import useCalculateDimetions from "./useCalculateDimetions";

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

  const dimentions = useCalculateDimetions({
    height,
    width,
  });

  // const [internalIsEnabled, setInternalIsEnabled] = useState(false);

  // const { backgroundColor, translateX } = useAnimation({
  //   internalIsEnabled,
  //   thumbWidth: dimentions.thumbWidth,
  //   trackWidth: dimentions.trackWidth,
  // });

  function handleChangeIsEnabled() {
    if (disabled) return;

    // setInternalIsEnabled(!internalIsEnabled);
    onChange?.(!value);
  }

  return (
    <View>
      {label && (
        <BaseTypography
          variant="BODY2"
          style={{
            color: theme.palette.background.textPrimary,
            marginBottom: theme.spacing(dimentions.labelMarginBottom),
          }}
        >
          {label}
        </BaseTypography>
      )}

      <BaseButton onPress={handleChangeIsEnabled} disabled={disabled}>
        <View
          style={{
            // backgroundColor,
            width: dimentions.trackWidth,
            height: dimentions.trackHeight,
            borderRadius: dimentions.trackRadius,
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
              // transform: [{ translateX }],
              backgroundColor: value
                ? theme.palette.primary.dark
                : theme.palette.grey[700],
              height: dimentions.thumbHeight,
              width: dimentions.thumbWidth,
              borderRadius: dimentions.thumbRadius,
              position: "absolute",
              top: dimentions.thumbTop,
              left: value ? dimentions.trackWidth - dimentions.thumbWidth : 0, // <-- aqui
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {value && enableIconName ? (
              <BaseIcon
                name={enableIconName}
                size={dimentions.iconSize}
                color={theme.palette.primary.contrast}
              />
            ) : !value && disableIconName ? (
              <BaseIcon
                name={disableIconName}
                size={dimentions.iconSize}
                color={theme.palette.primary.contrast}
              />
            ) : null}
          </View>
        </View>
      </BaseButton>
    </View>
  );
}
