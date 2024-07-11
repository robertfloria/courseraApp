import { Stack } from "expo-router";
import { Fragment } from "react";
import MenuScreen from "./menuScreen";

export default function RootLayout() {

  return (
    <Fragment>
        {/* <SQLiteProvider databaseName="littleLemon.db" onInit={initializeDatabase} useSuspense> */}
        <MenuScreen />
        {/* <Stack>
        <Stack.Screen name="(welcomeScreen)" options={{ title: 'Welcome' }} />
        <Stack.Screen name="subscribeScreen" options={{ title: 'Subscribe' }} />
      </Stack> */}
        {/* </SQLiteProvider> */}
    </Fragment>
  );
}
