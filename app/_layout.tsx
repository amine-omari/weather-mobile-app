import "../global.css";
import MainContainer from "./MainContainer";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View className="w-screen h-screen items-center justify-center">
      <MainContainer />
    </View>
  );
}
