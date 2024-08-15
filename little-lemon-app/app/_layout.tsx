import { Stack, useRouter } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { retrieveAuthentication } from "@/store/asyncStorage/getData";
import { AuthenticationContext } from "@/store/context/authenticationContext";

export default function RootLayout() {
  const router = useRouter();
  const [authentication, setAuthentication] = useState(null);

  useEffect(() => {
    (async () => {
      const authentication = await retrieveAuthentication();
      if (authentication) {
        setAuthentication(authentication);
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
            headerShown: false,
          }}
        >
          {authentication ? (
            <AuthenticationContext.Provider value={authentication}>
              <Stack.Screen name="(menuScreen)" options={{ title: "Menu" }} />
              <Stack.Screen
                name="profileScreen"
                options={{ title: "Profile" }}
              />
            </AuthenticationContext.Provider>
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
