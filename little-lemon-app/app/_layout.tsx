import { Stack } from "expo-router";
import * as SQLite from 'expo-sqlite';

const db= SQLite.openDatabaseSync('little_lemon');

export default function RootLayout() {
  
  return (
    <Stack>
      <Stack.Screen name="(welcomeScreen)" options={{ title: 'Welcome' }} />
      <Stack.Screen name="subscribeScreen" options={{ title: 'Subscribe' }} />
    </Stack>
  );
}
