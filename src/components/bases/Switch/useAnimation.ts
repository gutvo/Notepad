import useTheme from "@Hooks/useTheme";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

interface UseAnimationProps {
  internalIsEnabled: boolean;
  trackWidth: number;
  thumbWidth: number;
}

export default function useAnimation({
  internalIsEnabled,
  thumbWidth,
  trackWidth,
}: UseAnimationProps) {
  const theme = useTheme();

  // Animated value vai de 0 a 1
  const animation = useRef(new Animated.Value(0)).current;

  // Dispara a animação sempre que internalIsEnabled muda
  useEffect(() => {
    Animated.timing(animation, {
      toValue: internalIsEnabled ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false, // porque estamos animando layout
    }).start();
  }, [animation, internalIsEnabled]);

  // Interpolação do valor para posição do círculo
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, trackWidth - thumbWidth],
  });

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.palette.grey[300], theme.palette.primary.light],
  });

  return { translateX, backgroundColor };
}
