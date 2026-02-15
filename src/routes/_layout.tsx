import HighLevelProvider from "@Providers/HighLevelProvider";
import ModalProvider from "@Providers/ModalProvider";
import { PortalProvider } from "@Providers/PotalProvider";
import ThemeProvider from "@Providers/ThemeProvider";
import ToastProvider from "@Providers/ToastProvider";
import { Slot } from "expo-router";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

LogBox.ignoreLogs(["Remote debugger"]);

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <ModalProvider>
          <PortalProvider>
            <ToastProvider>
              <HighLevelProvider>
                <Slot />
              </HighLevelProvider>
            </ToastProvider>
          </PortalProvider>
        </ModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
