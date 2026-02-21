import { useNavigation as useReactNavigation } from "@react-navigation/native";
import { useRouter, type Router } from "expo-router";
import { useCallback, useMemo } from "react";
import useModal from "./useModal";

export default function useNavigation() {
  const navigation = useReactNavigation();
  const router = useRouter();
  const { closeAllModals } = useModal();

  const wrapNavigationMethod = useCallback(
    <DataProps extends (...args: any[]) => any>(
      method: DataProps,
    ): DataProps => {
      return ((...args: any[]) => {
        closeAllModals();
        return method(...args);
      }) as DataProps;
    },
    [closeAllModals],
  );

  return useMemo(() => {
    const typedRouter: Router = router;

    return {
      push: wrapNavigationMethod(typedRouter.push),
      navigate: wrapNavigationMethod(typedRouter.navigate),
      replace: wrapNavigationMethod(typedRouter.replace),
      back: wrapNavigationMethod(typedRouter.back),

      canGoBack: typedRouter.canGoBack,

      setOptions: navigation.setOptions,
      addListener: navigation.addListener,
    };
  }, [
    router,
    wrapNavigationMethod,
    navigation.setOptions,
    navigation.addListener,
  ]);
}
