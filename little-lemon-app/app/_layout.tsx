import { Stack, useRouter } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { retrieveAuthentication } from "@/store/asyncStorage/getData";

export default function RootLayout() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    (async () => {
      const authentication = await retrieveAuthentication();
      if (authentication) {
        setAuthenticated(authentication);
      } else {
        router.push("/onboardingScreen");
      }
    })();
  }, []);

  return (
    <Fragment>
      <SQLiteProvider databaseName="littleLemon.db" useSuspense>
        <Stack
          screenOptions={{
            headerShown: false
          }}
        >
          {authenticated ? (
            <Fragment>
              <Stack.Screen name="(menuScreen)" options={{ title: "Menu" }} />
              <Stack.Screen
                name="profileScreen"
                options={{ title: "Profile" }}
              />
            </Fragment>
          ) : (
            <Stack.Screen
              name="onboardingScreen"
              options={{ title: "Onboarding" }}
            />
          )}
        </Stack>
      </SQLiteProvider>
    </Fragment>
  );
}
