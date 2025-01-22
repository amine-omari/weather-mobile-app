import { Slot, SplashScreen } from "expo-router/build/exports";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import "../global.css";

export default Slot;
