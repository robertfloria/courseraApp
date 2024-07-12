import { Stack } from "expo-router";
import { Fragment } from "react";
import MenuScreen from "./menuScreen";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <Fragment>
      <SQLiteProvider databaseName="littleLemon.db" useSuspense>
        <MenuScreen />
        {/* <Stack>
        <Stack.Screen name="(welcomeScreen)" options={{ title: 'Welcome' }} />
        <Stack.Screen name="subscribeScreen" options={{ title: 'Subscribe' }} />
      </Stack> */}
      </SQLiteProvider>
    </Fragment>
  );
}
