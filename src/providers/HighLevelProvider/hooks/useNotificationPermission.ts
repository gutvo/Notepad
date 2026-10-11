import * as Notifications from "expo-notifications";
import { useCallback, useEffect, useState } from "react";

export default function useNotificationPermission() {
  const [granted, setGranted] = useState<boolean | null>(null);

  const requestPermission = useCallback(async () => {
    const { status } = await Notifications.getPermissionsAsync();

    if (status === "granted") {
      setGranted(true);
      return true;
    }

    const { status: newStatus } = await Notifications.requestPermissionsAsync();

    const isGranted = newStatus === "granted";
    setGranted(isGranted);

    return isGranted;
  }, []);

  useEffect(() => {
    let isMounted = true;

    void (async () => {
      const result = await requestPermission();

      if (isMounted) {
        setGranted(result);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [requestPermission]);

  return {
    granted,
    requestPermission,
  };
}
