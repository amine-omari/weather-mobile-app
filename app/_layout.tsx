import { SplashScreen } from "expo-router/build/exports";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import "../global.css";
import MainContainer from "./MainContainer";

export default function RootLayout() {
  return <MainContainer />;
}
