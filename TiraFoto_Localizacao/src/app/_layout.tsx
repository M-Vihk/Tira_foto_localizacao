import { Stack } from "expo-router";
import { Provider } from "../theme/gluestackProvider";

export default function RootLayout() {
  return (
    <Provider>
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
}
