import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { retrieveAuthentication } from "@/store/asyncStorage/getData";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { Authentication } from "@/utils/interfaces";
import CustomHeader from "@/components/layout/CustomHeader";
import RightHeader from "../components/menuScreen/components/RightHeader/RightHeader";
import { NavigateBackBtn } from "@/components/navigation/NavigateBackBtn";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { HeaderContextProvider } from "@/store/context/HeaderContextProvider";
import ChangeThemeButton from "@/components/layout/ChangeThemeButton";
import { ThemeContextProvider } from "@/store/context/ThemeContextProvider";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import ScreensSetup from "@/components/navigation/ScreensSetup";

export default function RootLayout() {
  const router = useRouter();
  const [authentication, setAuthentication] = useState<Authentication>({
    firstName: "",
    email: "",
  });

  // const menuScreenHeaderColor = useThemeColor({}, "secondColor");
  // const drawerBackground = useThemeColor({}, "thirdColor");

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
        <HeaderContextProvider>
          <ThemeContextProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <ChangeThemeButton />
              <ScreensSetup />
            </GestureHandlerRootView>
          </ThemeContextProvider>
        </HeaderContextProvider>
      </AuthenticationContext.Provider>
    </SQLiteProvider>
  );
}
