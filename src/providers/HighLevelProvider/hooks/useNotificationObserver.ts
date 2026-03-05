import * as Notifications from "expo-notifications";
import { Route } from "expo-router";
import { useCallback, useEffect } from "react";
import useNavigation from "../../../hooks/useNavigation";

interface NotificationDataProps {
  url?: Route;
  params?: any;
  reminderId?: string;
}

interface UseNotificationObserverProps {
  isThemeLoading: boolean;
}

export default function useNotificationObserver({
  isThemeLoading,
}: UseNotificationObserverProps) {
  const navigation = useNavigation();

  const redirect = useCallback(
    (notification: Notifications.Notification) => {
      if (isThemeLoading) return;

      const data = notification.request.content.data as NotificationDataProps;
      const url = data?.url;
      const params = data.params;

      if (!url) return;

      navigation.navigate({ pathname: url, params });
    },
    [navigation, isThemeLoading],
  );

  useEffect(() => {
    const response = Notifications.getLastNotificationResponse();

    if (response?.notification) redirect(response.notification);

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => redirect(response.notification),
    );

    return () => {
      subscription.remove();
    };
  }, [redirect]);
}
