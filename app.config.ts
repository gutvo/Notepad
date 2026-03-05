import { ExpoConfig } from "expo/config";
import "tsx/cjs"; // Add this to import TypeScript files

const config: ExpoConfig = {
  name: "Bloco de notas",
  slug: "bloco-de-notas",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "notepad",
  userInterfaceStyle: "automatic",

  ios: {
    supportsTablet: true,
  },
  android: {
    package: "com.anonymous.notepad",
    permissions: [
      "BLUETOOTH",
      "BLUETOOTH_ADMIN",
      "BLUETOOTH_SCAN",
      "BLUETOOTH_CONNECT",
      "ACCESS_FINE_LOCATION",
    ],
    adaptiveIcon: {
      backgroundColor: "#f9fafb",
      foregroundImage: "./assets/images/android-icon-foreground.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    allowBackup: false,
  },
  plugins: [
    ["expo-router", { root: "./src/routes" }],
    ["expo-sqlite", { useSQLCipher: true }],
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#f9fafb",
        dark: {
          backgroundColor: "#111827",
        },
      },
    ],
    ["expo-notifications", { icon: "./assets/images/notification-icon.png" }],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

export default config;
