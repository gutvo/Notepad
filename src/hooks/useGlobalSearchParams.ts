import { useGlobalSearchParams as useExpoGlobalSearchParams } from "expo-router";
import { PageNames, RootStackParamList } from "../routes";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ToSearchParams<T> = T extends undefined ? {} : { [K in keyof T]: string };

export default function useGlobalSearchParams<PageName extends PageNames>(
  pageName: PageName,
) {
  return useExpoGlobalSearchParams<
    ToSearchParams<NonNullable<RootStackParamList[PageName]>>
  >();
}
