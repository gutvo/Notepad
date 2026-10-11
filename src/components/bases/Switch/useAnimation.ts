import useTheme from "@Hooks/useTheme";
import { useEffect, useState } from "react";
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

  const [animation] = useState(() => new Animated.Value(0));

  const maxTranslate = trackWidth - thumbWidth;

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
    outputRange: [0, maxTranslate + thumbWidth * 0.1],
  });

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.palette.grey[300], theme.palette.primary.light],
  });

  return { translateX, backgroundColor };
}
