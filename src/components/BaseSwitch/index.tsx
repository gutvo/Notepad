import BaseTypography from "@Components/BaseTypography";
import useTheme from "@Hooks/useTheme";
import React, { ComponentProps } from "react";
import { TouchableOpacity, View } from "react-native";
import useCalculateDimetions from "./useCalculateDimetions";

import { MaterialCommunityIcons } from "@expo/vector-icons";

type IconNameProps = ComponentProps<typeof MaterialCommunityIcons>["name"];

interface BaseSwitchProps {
  label?: string;
  enableIconName?: IconNameProps;
  disableIconName?: IconNameProps;
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
            color: theme.palette.background.border,
            marginBottom: theme.spacing(dimentions.labelMarginBottom),
          }}
        >
          {label}
        </BaseTypography>
      )}

      <TouchableOpacity
        onPress={handleChangeIsEnabled}
        activeOpacity={1}
        disabled={disabled}
      >
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
              <MaterialCommunityIcons
                name={enableIconName}
                size={dimentions.iconSize}
                color={theme.palette.primary.contrast}
              />
            ) : !value && disableIconName ? (
              <MaterialCommunityIcons
                name={disableIconName}
                size={dimentions.iconSize}
                color={theme.palette.primary.contrast}
              />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
