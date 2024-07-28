import { Stack } from "expo-router";
import { Fragment } from "react";
import { SQLiteProvider } from "expo-sqlite";
import MenuScreen from "./menuScreen";

export default function RootLayout() {
  return (
    <Fragment>
      <SQLiteProvider databaseName="littleLemon.db" useSuspense>
        <MenuScreen />
        {/* <Stack>
          <Stack.Screen name="(welcomeScreen)" options={{ title: 'Welcome' }} />
          <Stack.Screen name="subscribeScreen" options={{ title: 'Subscribe' }} />
          <Stack.Screen name="menuScreen" options={{ title: 'Menu' }} />
        </Stack> */}
      </SQLiteProvider>
    </Fragment>
  );
}
