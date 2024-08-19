import { Stack, useRouter } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { retrieveAuthentication } from "@/store/asyncStorage/getData";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { Authentication } from "@/utils/interfaces";

export default function RootLayout() {
  const router = useRouter();
  const [authentication, setAuthentication] = useState<Authentication>({
    firstName: '',
    email: ''
  });

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
    <SQLiteProvider databaseName="littleLemon.db" useSuspense>
      <AuthenticationContext.Provider value={authentication}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          {authentication.email ? (
            <Fragment>
              <Stack.Screen name="(menuScreen)" options={{ title: "Menu" }} />
              <Stack.Screen
                name="profileScreen"
                options={{ title: "Profile" }}
              />
              <Stack.Screen
                name="shoppingCartScreen"
                options={{ title: "Shopping Cart" }}
              />
            </Fragment>
          ) : (
            <Stack.Screen
              name="onboardingScreen"
              options={{ title: "Onboarding" }}
            />
          )}
        </Stack>
      </AuthenticationContext.Provider>
    </SQLiteProvider>
  );
}
