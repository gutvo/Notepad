import { ExpoConfig } from "expo/config";
import "tsx/cjs"; // Add this to import TypeScript files

const config: ExpoConfig = {
  name: "notepad",
  slug: "Bloco de notas",
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
    adaptiveIcon: {
      foregroundImage: "./assets/images/android-icon-foreground.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
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
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

export default config;
