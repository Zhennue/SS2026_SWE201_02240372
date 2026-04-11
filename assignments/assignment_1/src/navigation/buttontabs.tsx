import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screen/home";
import Contacts from "../screen/contacts";
import Schedule from "../screen/schedule";
import NoticeBoard from "../screen/noticeboard";
import { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();
export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Contacts" component={Contacts} />
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen
        name="NoticeBoard"
        component={NoticeBoard}
        options={{ title: "Notices" }}
      />
    </Tab.Navigator>
  );
}
