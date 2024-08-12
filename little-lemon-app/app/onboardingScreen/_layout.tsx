import NavigationHeader from "@/components/layout/NavigationHeader";
import { Stack } from "expo-router";
import { SafeAreaView, Text } from "react-native";

const CustomHeader = () => {
  return (
    <SafeAreaView style={{ height: 'auto' }}>
      <NavigationHeader />
    </SafeAreaView>
  )
}
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
        header: () => <CustomHeader />
      }} />
    </Stack>
  );
}
