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
        <HeaderContextProvider>
          <ThemeContextProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <ChangeThemeButton />
              <Drawer>
                <Drawer.Screen
                  name="index"
                  options={{
                    headerShown: true,
                    title: "Menu",
                    drawerLabel: "Menu",
                    header: () => <CustomHeader RightComponent={RightHeader} />,
                  }}
                />
                <Drawer.Screen
                  name="profile"
                  options={{
                    title: "Profile",
                    drawerLabel: "Profile",
                    headerShown: true,
                    header: () => (
                      <CustomHeader LeftComponent={NavigateBackBtn} />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="shoppingCart"
                  options={{
                    title: "Shopping Cart",
                    drawerLabel: "Shopping Cart",
                    headerShown: true,
                    header: () => (
                      <CustomHeader LeftComponent={NavigateBackBtn} />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="onboarding"
                  options={{
                    title: "Onboarding",
                    drawerLabel: "Onboarding",
                    headerShown: false,
                  }}
                />
              </Drawer>
            </GestureHandlerRootView>
          </ThemeContextProvider>
        </HeaderContextProvider>
      </AuthenticationContext.Provider>
    </SQLiteProvider>
  );
}
