import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type DayPlan = {
  day: string;
  sessions: string[];
};

const WEEKLY_PLAN: DayPlan[] = [
  {
    day: "Monday",
    sessions: ["09:00 SWE201", "11:00 MAT301", "14:00 Lab Session"],
  },
  {
    day: "Tuesday",
    sessions: ["08:30 DSA", "10:30 SWE201 Tutorial", "13:30 Database"],
  },
  {
    day: "Wednesday",
    sessions: ["09:00 OS", "11:00 Project Work", "15:00 Club Activities"],
  },
  {
    day: "Thursday",
    sessions: ["10:00 SWE201", "12:00 Software Testing", "14:30 Library Hour"],
  },
  {
    day: "Friday",
    sessions: [
      "09:00 Seminar",
      "11:00 Revision",
      "13:00 Assignment Consultation",
    ],
  },
];

export default function Schedule() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.heading}>Weekly Timetable</Text>
      <Text style={styles.subheading}>
        Compact overview for quick planning.
      </Text>

      {WEEKLY_PLAN.map((dayPlan) => (
        <View key={dayPlan.day} style={styles.dayCard}>
          <Text style={styles.dayTitle}>{dayPlan.day}</Text>
          {dayPlan.sessions.map((session) => (
            <Text key={session} style={styles.sessionText}>
              • {session}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
  },
  subheading: {
    color: "#475569",
    marginTop: 4,
    marginBottom: 14,
  },
  dayCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dbeafe",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  dayTitle: {
    color: "#1d4ed8",
    fontWeight: "700",
    marginBottom: 8,
    fontSize: 17,
  },
  sessionText: {
    color: "#1e293b",
    marginBottom: 4,
  },
});
