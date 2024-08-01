import { Stack } from "expo-router";
import { Fragment } from "react";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <Fragment>
      {/* <SQLiteProvider databaseName="littleLemon.db" useSuspense> */}
      <Stack>
        <Stack.Screen name="(welcomeScreen)" options={{ title: 'Welcome' }} />
        <Stack.Screen name="subscribeScreen" options={{ title: 'Subscribe' }} />
        <Stack.Screen name="menuScreen" options={{ title: 'Menu' }} />
        <Stack.Screen name="onboardingScreen" options={{ title: 'Onboarding' }} />
        <Stack.Screen name="profileScreen" options={{ title: 'Profile' }} />
      </Stack>
      {/* </SQLiteProvider> */}
    </Fragment>
  );
}
