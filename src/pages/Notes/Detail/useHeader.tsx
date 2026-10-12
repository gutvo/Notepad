import BaseButton from "@Components/bases/Button";
import BaseIcon from "@Components/bases/Icon";
import BaseTypography from "@Components/bases/Typography";
import useLocale from "@Hooks/useLocale";
import useNavigation from "@Hooks/useNavigation";
import useOnGoBack from "@Hooks/useOnGoBack";
import useTheme from "@Hooks/useTheme";
import { useCallback, useLayoutEffect } from "react";

interface UseHeaderProps {
  onSubmit: () => Promise<void>;
  isDirty: boolean;
  onOpenActions: () => void;
}

export default function useHeader({
  onSubmit,
  isDirty,
  onOpenActions,
}: UseHeaderProps) {
  const theme = useTheme();
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
      <BaseButton onPress={onOpenActions}>
        <BaseIcon color={theme.palette.primary.contrast} name="dots-vertical" />
      </BaseButton>
    ),
    [onOpenActions, theme.palette.primary.contrast],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle,
      headerLeft,
      headerRight,
    });
  }, [navigation, headerTitle, headerLeft, headerRight]);
}
