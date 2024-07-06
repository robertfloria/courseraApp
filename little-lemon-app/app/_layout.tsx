import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="welcomeScreen" options={{ title: 'Welcome' }} />
      <Stack.Screen name="subscribeScreen" options={{ title: 'Subscribe' }} />
    </Stack>
  );
}
