import { useNavigation as useReactNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useMemo } from "react";

export default function useNavigation() {
  const navigation = useReactNavigation();
  const router = useRouter();

  return useMemo(
    () => ({
      push: router.push,
      navigate: router.navigate,
      replace: router.replace,
      back: router.back,
      canGoBack: router.canGoBack,

      setOptions: navigation.setOptions,
      addListener: navigation.addListener,
    }),
    [
      router.push,
      router.navigate,
      router.replace,
      router.back,
      router.canGoBack,
      navigation.setOptions,
      navigation.addListener,
    ],
  );
}
