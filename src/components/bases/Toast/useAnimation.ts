import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, PanResponder } from "react-native";

interface UseAnimationProps {
  duration: number;
  onHide: () => void;
}

export default function useAnimation({ duration, onHide }: UseAnimationProps) {
  const [translateY] = useState(() => new Animated.Value(-150));
  const [opacity] = useState(() => new Animated.Value(0));
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

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
    ]).start(onHide);
  }, [onHide, opacity, translateY]);

  const open = useCallback(() => {
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

    timeoutRef.current = setTimeout(() => {
      close();
    }, duration);
  }, [close, duration, opacity, translateY]);

  useEffect(() => {
    open();
  }, [open]);

  const [pan] = useState(() => new Animated.ValueXY());

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dx) > 5, // agora olha para o movimento horizontal
    onPanResponderMove: Animated.event([null, { dx: pan.x }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 150 || gestureState.dx < -150) {
        // deslizou para direita ou esquerda
        onHide();
      } else {
        // volta para posição original
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return { translateY, opacity, close, panResponder, pan };
}
