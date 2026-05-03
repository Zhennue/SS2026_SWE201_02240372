import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PLANNER_ITEMS } from "../data/studentAppData";

export default function Schedule() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>Planner</Text>
      <Text style={styles.heading}>A clean week at a glance.</Text>
      <Text style={styles.subheading}>
        The schedule is intentionally simple so it reads like an app you would
        actually use.
      </Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryIcon}>
          <Ionicons name="time-outline" size={20} color="#fffdf8" />
        </View>
        <View style={styles.summaryTextWrap}>
          <Text style={styles.summaryTitle}>2 focus blocks left this week</Text>
          <Text style={styles.summaryText}>
            Keep the final edit sessions short and intentional.
          </Text>
        </View>
      </View>

      {PLANNER_ITEMS.map((item) => (
        <View key={item.id} style={styles.dayCard}>
          <View
            style={[styles.dayChip, { backgroundColor: `${item.accent}18` }]}
          >
            <Text style={[styles.dayTitle, { color: item.accent }]}>
              {item.day}
            </Text>
          </View>
          <Text style={styles.sessionTitle}>{item.title}</Text>
          <Text style={styles.sessionText}>{item.time}</Text>
          <Text style={styles.sessionText}>{item.location}</Text>
        </View>
      ))}
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
    paddingBottom: 30,
  },
  kicker: {
    color: "#b45309",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  heading: {
    marginTop: 8,
    fontSize: 28,
    lineHeight: 33,
    fontWeight: "900",
    color: "#132238",
  },
  subheading: {
    color: "#5d6675",
    marginTop: 8,
    marginBottom: 14,
    lineHeight: 20,
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#fffdf8",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#eadfce",
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 2,
    marginBottom: 14,
  },
  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#264653",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryTextWrap: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#132238",
  },
  summaryText: {
    marginTop: 4,
    color: "#5f6a78",
    lineHeight: 19,
  },
  dayCard: {
    backgroundColor: "#fffdf8",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#eadfce",
    marginBottom: 10,
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 1,
  },
  dayChip: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
  },
  dayTitle: {
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  sessionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#132238",
    marginBottom: 8,
  },
  sessionText: {
    color: "#5d6675",
    marginBottom: 4,
    fontWeight: "600",
  },
});
