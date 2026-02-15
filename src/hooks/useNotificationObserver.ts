import * as Notifications from "expo-notifications";
import { Href } from "expo-router";
import { useCallback, useEffect } from "react";
import useNavigation from "./useNavigation";

interface NotificationDataProps {
  url?: Href;
  params?: any;
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

      if (!url) return;

      navigation.navigate(url);
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
