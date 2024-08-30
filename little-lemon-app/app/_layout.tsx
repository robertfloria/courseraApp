import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { retrieveAuthentication } from "@/store/asyncStorage/getData";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { Authentication } from "@/utils/interfaces";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RerenderContextProvider } from "@/store/context/RerenderContextProvider";
import ChangeThemeButton from "@/components/layout/ChangeThemeButton";
import { ThemeContextProvider } from "@/store/context/ThemeContextProvider";
import ScreensSetup from "@/components/navigation/ScreensSetup";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const [authentication, setAuthentication] = useState<Authentication>({
    firstName: "",
    email: "",
  });

  useEffect(() => {
    (async () => {
      const fetchAuthentication = await retrieveAuthentication();
      if (fetchAuthentication) {
        setAuthentication(fetchAuthentication);
      } else {
        router.push("/onboarding");
      }
    })();
  }, []);

  return (
    <SQLiteProvider databaseName="littleLemon.db" useSuspense>
      <AuthenticationContext.Provider
        value={{ ...authentication, setAuthentication: setAuthentication }}
      >
        <RerenderContextProvider>
          <ThemeContextProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Adjust if necessary
              >
                <ChangeThemeButton />
                <ScreensSetup />
              </KeyboardAvoidingView>
            </GestureHandlerRootView>
          </ThemeContextProvider>
        </RerenderContextProvider>
      </AuthenticationContext.Provider>
    </SQLiteProvider>
  );
}
