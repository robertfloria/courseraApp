import { Stack } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { Fragment } from "react";
import MenuScreen from "./menuScreen";

// const db = SQLite.openDatabaseSync('little_lemon');

export default function RootLayout() {

  return (
    <Fragment>
      <MenuScreen />
      {/* <Stack>
        <Stack.Screen name="(welcomeScreen)" options={{ title: 'Welcome' }} />
        <Stack.Screen name="subscribeScreen" options={{ title: 'Subscribe' }} />
      </Stack> */}
    </Fragment>
  );
}
