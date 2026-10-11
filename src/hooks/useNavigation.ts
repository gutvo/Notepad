import { useRouter } from "expo-router";
import { useNavigation as useReactNavigation } from "expo-router/react-navigation";
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
    return {
      push: wrapNavigationMethod(router.push),
      navigate: wrapNavigationMethod(router.navigate),
      replace: wrapNavigationMethod(router.replace),
      back: wrapNavigationMethod(router.back),

      canGoBack: router.canGoBack,

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
