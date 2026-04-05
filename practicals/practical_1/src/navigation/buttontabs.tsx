import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screen/home";
import Profile from "../screen/profile";

const Tab = createBottomTabNavigator();
export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}