import { useCallback, useEffect, useMemo, useState } from "react";
import { Animated, PanResponder } from "react-native";

interface UseAnimationProps {
  duration: number;
  onHide: () => void;
}

export default function useAnimation({ duration, onHide }: UseAnimationProps) {
  const [translateY] = useState(() => new Animated.Value(-150));
  const [opacity] = useState(() => new Animated.Value(0));
  const [pan] = useState(() => new Animated.ValueXY());

  const close = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -150,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(({ finished }) => {
      if (finished) onHide();
    });
  }, [onHide, opacity, translateY]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: false,
      }),
    ]).start();
    return () => {
      translateY.stopAnimation();
      opacity.stopAnimation();
      pan.stopAnimation();
    };
  }, [opacity, pan, translateY]);

  useEffect(() => {
    const timeout = setTimeout(close, duration);
    return () => clearTimeout(timeout);
  }, [close, duration]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onPanResponderMove: Animated.event([null, { dx: pan.x }], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: (_, gestureState) => {
          if (Math.abs(gestureState.dx) > 100) {
            close();
            return;
          }

          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        },
      }),
    [close, pan],
  );

  return { translateY, opacity, close, panResponder, pan };
}
