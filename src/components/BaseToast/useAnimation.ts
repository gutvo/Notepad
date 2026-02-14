import { useCallback, useEffect, useRef } from "react";
import { Animated } from "react-native";

interface UseAnimationProps {
  duration: number;
  onHide: () => void;
}

export default function useAnimation({ duration, onHide }: UseAnimationProps) {
  const translateY = useRef(new Animated.Value(-150)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const close = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -150,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(onHide);
  }, [onHide, opacity, translateY]);

  const open = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();

    timeoutRef.current = setTimeout(() => {
      close();
    }, duration);
  }, [close, duration, opacity, translateY]);

  useEffect(() => {
    open();
  }, [open]);

  return { translateY, opacity, close };
}
