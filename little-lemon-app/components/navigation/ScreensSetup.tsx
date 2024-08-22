import { Drawer } from "expo-router/drawer";
import CustomHeader from "../layout/CustomHeader";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import RightHeader from "../menuScreen/components/RightHeader/RightHeader";
import { NavigateBackBtn } from "./NavigateBackBtn";

export default function ScreensSetup() {
  const menuScreenHeaderColor = useThemeColor({}, "secondColor");
  const activeTextColor = useThemeColor({}, "firstColor");
  const drawerBackground = useThemeColor({}, "thirdColor");
  const itemBackground = useThemeColor({}, "opacityGrey");
  const textColor = useThemeColor({}, "text");

  return (
    <Drawer
      screenOptions={{
        drawerStyle: { backgroundColor: drawerBackground },
        drawerItemStyle: { backgroundColor: itemBackground },
        drawerActiveTintColor: activeTextColor,
        drawerInactiveTintColor: textColor,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Menu",
          drawerLabel: "Menu",
          header: () => (
            <CustomHeader
              backgroundColor={menuScreenHeaderColor}
              textColor={Colors.light.text}
              RightComponent={RightHeader}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerLabel: "Profile",
          headerShown: true,
          header: () => <CustomHeader LeftComponent={NavigateBackBtn} />,
        }}
      />
      <Drawer.Screen
        name="shoppingCart"
        options={{
          title: "Shopping Cart",
          drawerLabel: "Shopping Cart",
          headerShown: true,
          header: () => <CustomHeader LeftComponent={NavigateBackBtn} />,
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
  );
}
