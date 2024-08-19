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
import { HeaderContext } from "@/store/context/HeaderContext";

export default function RootLayout() {
  const router = useRouter();
  const [authentication, setAuthentication] = useState<Authentication>({
    firstName: "",
    email: "",
  });
  const [resetPicture, setResetPicture] = useState<boolean>(false);
  const [resetCartCounter, setResetResetCartCounter] = useState<boolean>(false);

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

  // if (!authentication.email) {
  //   return;
  // }

  return (
    <SQLiteProvider databaseName="littleLemon.db" useSuspense>
      <AuthenticationContext.Provider
        value={{ ...authentication, setAuthentication: setAuthentication }}
      >
        <HeaderContext.Provider
          value={{
            resetPicture: resetPicture,
            setResetPicture: setResetPicture,
            resetCartCounter: resetCartCounter,
            setResetResetCartCounter: setResetResetCartCounter,
          }}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
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
                  headerShown: true,
                  header: () => <CustomHeader hasDrawer={false} />,
                }}
              />
            </Drawer>
          </GestureHandlerRootView>
        </HeaderContext.Provider>
      </AuthenticationContext.Provider>
    </SQLiteProvider>
  );
}
