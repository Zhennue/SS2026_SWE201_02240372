import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./buttontabs";
import ContactDetails from "../screen/contactdetails";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainTabs"
    >
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetails}
        options={{
          headerShown: true,
          title: "Contact Details",
        }}
      />
    </Stack.Navigator>
  );
}
