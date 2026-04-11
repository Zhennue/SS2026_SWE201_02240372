import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "../navigation/types";

type Props = BottomTabScreenProps<MainTabParamList, "Home">;

type CardItem = {
  label: string;
  description: string;
  route: "Contacts" | "Schedule" | "NoticeBoard";
};

const QUICK_LINKS: CardItem[] = [
  {
    label: "Important Contacts",
    description: "Find IT helpdesk, student services, security and more.",
    route: "Contacts",
  },
  {
    label: "Weekly Timetable",
    description: "View your class schedule overview in one place.",
    route: "Schedule",
  },
  {
    label: "Notices & Map Links",
    description: "Read campus updates and open map links quickly.",
    route: "NoticeBoard",
  },
];

export default function Home({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const [darkMode, setDarkMode] = useState(false);
  const isSmallDevice = width < 390;

  const palette = useMemo(
    () =>
      darkMode
        ? {
            screen: "#0f172a",
            heading: "#e2e8f0",
            body: "#cbd5e1",
            card: "#1e293b",
            border: "#334155",
            button: "#38bdf8",
            buttonText: "#0c4a6e",
          }
        : {
            screen: "#ecfeff",
            heading: "#0f172a",
            body: "#334155",
            card: "#ffffff",
            border: "#bae6fd",
            button: "#0ea5e9",
            buttonText: "#ffffff",
          },
    [darkMode],
  );

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: palette.screen }]}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar style={darkMode ? "light" : "dark"} />
      <Text style={[styles.title, { color: palette.heading }]}>
        Campus Companion
      </Text>
      <Text style={[styles.subtitle, { color: palette.body }]}>
        Your quick guide to daily campus life.
      </Text>

      <Pressable
        style={[styles.toggleButton, { borderColor: palette.border }]}
        onPress={() => setDarkMode((previous) => !previous)}
      >
        <Text style={[styles.toggleText, { color: palette.body }]}>
          Theme: {darkMode ? "Dark" : "Light"}
        </Text>
      </Pressable>

      <View style={styles.cardList}>
        {QUICK_LINKS.map((item) => (
          <Pressable
            key={item.label}
            style={[
              styles.card,
              isSmallDevice && styles.cardSmall,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
            onPress={() => navigation.navigate(item.route)}
          >
            <Text style={[styles.cardTitle, { color: palette.heading }]}>
              {item.label}
            </Text>
            <Text style={[styles.cardDescription, { color: palette.body }]}>
              {item.description}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={[styles.primaryButton, { backgroundColor: palette.button }]}
        onPress={() => navigation.navigate("Contacts")}
      >
        <Text style={[styles.primaryButtonText, { color: palette.buttonText }]}>
          Get Started
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 8,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    marginBottom: 14,
  },
  toggleButton: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 14,
  },
  toggleText: {
    fontWeight: "600",
  },
  cardList: {
    gap: 10,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  cardSmall: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    marginTop: 18,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
  },
  primaryButtonText: {
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
