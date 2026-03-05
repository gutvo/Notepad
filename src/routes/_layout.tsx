import useTheme from "@Hooks/useTheme";
import HighLevelProvider from "@Providers/HighLevelProvider";
import ModalProvider from "@Providers/ModalProvider";
import ThemeProvider from "@Providers/ThemeProvider";
import ToastProvider from "@Providers/ToastProvider";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function StackLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.palette.primary.main,
        },
        headerTintColor: theme.palette.primary.contrast,

        contentStyle: {
          backgroundColor: theme.palette.background.body,
        },
      }}
    />
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <GestureHandlerRootView>
        <ModalProvider>
          <ToastProvider>
            <HighLevelProvider>
              <StackLayout />
            </HighLevelProvider>
          </ToastProvider>
        </ModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
