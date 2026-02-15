import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { BackHandler } from "react-native";

interface UseOnGoBackProps {
  onBackPress: () => boolean;
}

export default function useOnGoBack({ onBackPress }: UseOnGoBackProps) {
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => {
        subscription.remove();
      };
    }, [onBackPress]),
  );
}
