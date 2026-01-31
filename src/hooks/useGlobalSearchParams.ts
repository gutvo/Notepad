import { useGlobalSearchParams as useExpoGlobalSearchParams } from "expo-router";
import { PageNames, RootStackParamList } from "../routes";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type NormalizeParams<T> = T extends undefined ? {} : T;

export default function useGlobalSearchParams<PageName extends PageNames>(
  pageName?: PageName,
) {
  return useExpoGlobalSearchParams<
    NormalizeParams<RootStackParamList[PageName]>
  >();
}
