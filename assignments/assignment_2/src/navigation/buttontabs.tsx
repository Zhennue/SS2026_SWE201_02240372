import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screen/home";
import Contacts from "../screen/contacts";
import Schedule from "../screen/schedule";
import NoticeBoard from "../screen/noticeboard";
import Animations from "../screen/animations";
import { MainTabParamList } from "./types";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator<MainTabParamList>();
export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#e76f51",
        tabBarInactiveTintColor: "#8a7f74",
        tabBarStyle: {
          backgroundColor: "#fffdf8",
          borderTopColor: "#e9dfd3",
          height: 66,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<
            string,
            React.ComponentProps<typeof Ionicons>["name"]
          > = {
            Home: "home-outline",
            Menu: "grid-outline",
            Planner: "calendar-outline",
            Profile: "person-circle-outline",
            Animations: "sparkles-outline",
          };

          return (
            <Ionicons name={iconMap[route.name]} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: "Home" }} />
      <Tab.Screen
        name="Menu"
        component={Contacts}
        options={{ title: "Menu" }}
      />
      <Tab.Screen
        name="Planner"
        component={Schedule}
        options={{ title: "Planner" }}
      />
      <Tab.Screen
        name="Profile"
        component={NoticeBoard}
        options={{ title: "Profile" }}
      />
      <Tab.Screen
        name="Animations"
        component={Animations}
        options={{ title: "Motion" }}
      />
    </Tab.Navigator>
  );
}
