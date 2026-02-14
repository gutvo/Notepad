import HighLevel from "@Providers/HighLevel";
import ModalProvider from "@Providers/ModalProvider";
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
          <ToastProvider>
            <HighLevel>
              <Slot />
            </HighLevel>
          </ToastProvider>
        </ModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
