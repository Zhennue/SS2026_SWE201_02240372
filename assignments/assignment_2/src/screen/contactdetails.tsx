import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export default function ContactDetails({ route, navigation }: Props) {
  const { item } = route.params;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.hero, { backgroundColor: item.accent }]}>
        <View style={styles.heroIcon}>
          <Ionicons
            name={item.icon as React.ComponentProps<typeof Ionicons>["name"]}
            size={26}
            color={item.accent}
          />
        </View>
        <Text style={styles.heroLabel}>{item.time}</Text>
        <Text style={styles.heroTitle}>{item.title}</Text>
        <Text style={styles.heroText}>{item.subtitle}</Text>
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.label}>What this screen shows</Text>
        <Text style={styles.bodyText}>{item.details}</Text>

        <Text style={styles.label}>Checklist</Text>
        {item.checklist.map((step) => (
          <View key={step} style={styles.stepRow}>
            <View style={[styles.stepDot, { backgroundColor: item.accent }]} />
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <Pressable
        style={styles.button}
        onPress={() =>
          Alert.alert("Saved", "This item is now part of your study flow.")
        }
      >
        <Text style={styles.buttonText}>Save to focus list</Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.secondaryText}>Go back</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5efe6",
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 28,
  },
  hero: {
    borderRadius: 28,
    padding: 18,
  },
  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  heroLabel: {
    color: "rgba(255,255,255,0.88)",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  heroTitle: {
    marginTop: 8,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "900",
    color: "#fffdf8",
  },
  heroText: {
    marginTop: 10,
    color: "rgba(255,255,255,0.88)",
    lineHeight: 21,
    fontWeight: "600",
  },
  label: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 6,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  detailCard: {
    marginTop: 14,
    backgroundColor: "#fffdf8",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#eadfce",
    padding: 16,
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 2,
  },
  bodyText: {
    color: "#475569",
    lineHeight: 20,
    marginBottom: 10,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  stepText: {
    flex: 1,
    color: "#132238",
    fontWeight: "600",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#14213d",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fffdf8",
    fontWeight: "800",
  },
  secondaryButton: {
    marginTop: 10,
    alignItems: "center",
    paddingVertical: 12,
  },
  secondaryText: {
    color: "#5d6675",
    fontWeight: "700",
  },
});
