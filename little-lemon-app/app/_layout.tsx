import { Stack, useRouter } from "expo-router";
import { Fragment, useEffect } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { retrieveAuthentication } from "@/store/asyncStorage/getData";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const authentication = await retrieveAuthentication();
      if (!authentication) {
        router.push('/onboardingScreen');
      }
    })();
  }, [])

  return (
    <Fragment>
      {/* <SQLiteProvider databaseName="littleLemon.db" useSuspense> */}
      <Stack>
        <Stack.Screen name="menuScreen" options={{ title: 'Menu' }} />
        <Stack.Screen name="onboardingScreen" options={{ title: 'Onboarding' }} />
        <Stack.Screen name="(profileScreen)" options={{ title: 'Profile' }} />
      </Stack>
      {/* </SQLiteProvider> */}
    </Fragment>
  );
}
