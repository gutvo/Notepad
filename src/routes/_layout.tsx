import useTheme from "@Hooks/useTheme";
import HighLevelProvider from "@Providers/HighLevelProvider";
import ModalProvider from "@Providers/ModalProvider";
import { PortalProvider } from "@Providers/PotalProvider";
import ThemeProvider from "@Providers/ThemeProvider";
import ToastProvider from "@Providers/ToastProvider";
import { Stack } from "expo-router";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

LogBox.ignoreLogs(["Remote debugger"]);

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
    <GestureHandlerRootView>
      <ThemeProvider>
        <ModalProvider>
          <PortalProvider>
            <ToastProvider>
              <HighLevelProvider>
                <StackLayout />
              </HighLevelProvider>
            </ToastProvider>
          </PortalProvider>
        </ModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
