import BaseButton from "@Components/bases/Button";
import BaseIcon from "@Components/bases/Icon";
import BaseTypography from "@Components/bases/Typography";
import BaseView from "@Components/bases/View";
import useLocale from "@Hooks/useLocale";
import useModal from "@Hooks/useModal";
import useNavigation from "@Hooks/useNavigation";
import useOnGoBack from "@Hooks/useOnGoBack";
import useTheme from "@Hooks/useTheme";
import { useCallback, useLayoutEffect } from "react";

interface UseHeaderProps {
  onSubmit: () => Promise<void>;
  isDirty: boolean;
  noteId: number | undefined;
}

export default function useHeader({
  onSubmit,
  isDirty,
  noteId,
}: UseHeaderProps) {
  const theme = useTheme();
  const { openModal } = useModal();
  const navigation = useNavigation();
  const { formatMessage } = useLocale();

  const handleGoBack = useCallback(() => {
    if (!navigation.canGoBack()) return true;

    if (!isDirty) {
      navigation.back();
      return true;
    }

    onSubmit();

    return true;
  }, [isDirty, navigation, onSubmit]);

  useOnGoBack({ onBackPress: handleGoBack });

  const headerLeft = useCallback(
    () => (
      <BaseButton
        onPress={handleGoBack}
        style={{ marginRight: theme.spacing(3) }}
      >
        <BaseIcon
          name="arrow-left"
          color={theme.palette.primary.contrast}
          style={{ marginRight: theme.spacing(3) }}
        />
      </BaseButton>
    ),
    [handleGoBack, theme],
  );

  const headerTitle = useCallback(
    () => (
      <BaseTypography style={{ color: theme.palette.primary.contrast }}>
        {formatMessage({ id: "pages.home-detail.title" })}
      </BaseTypography>
    ),
    [formatMessage, theme.palette.primary.contrast],
  );

  const headerRight = useCallback(
    () => (
      <BaseView
        style={{ display: "flex", flexDirection: "row", gap: theme.spacing(4) }}
      >
        {noteId && (
          <BaseButton onPress={() => openModal("REMINDER", { noteId })}>
            <BaseIcon
              color={theme.palette.primary.contrast}
              name="bell-plus-outline"
            />
          </BaseButton>
        )}
        <BaseButton onPress={() => openModal("CONFIG")}>
          <BaseIcon color={theme.palette.primary.contrast} name="cog-outline" />
        </BaseButton>
      </BaseView>
    ),
    [noteId, openModal, theme],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle,
      headerLeft,
      headerRight,
    });
  }, [navigation, headerTitle, headerLeft, headerRight]);
}
