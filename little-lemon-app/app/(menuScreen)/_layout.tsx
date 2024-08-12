import NavigationHeader from "@/components/layout/NavigationHeader";
import { Stack } from "expo-router";
import ProfileScreenButton from "./components/ProfileScreenButton";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: (props) => <NavigationHeader />,
        headerRight: (props) => <ProfileScreenButton />
      }} />
    </Stack>
  );
}
