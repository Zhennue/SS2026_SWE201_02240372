import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PROFILE_SETTINGS, PROFILE_TAGS } from "../data/studentAppData";

export default function NoticeBoard() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>Profile & settings</Text>
      <Text style={styles.heading}>Built for calm, focused work.</Text>
      <Text style={styles.subheading}>
        A human-looking profile screen that reads like a polished product
        setting panel.
      </Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={36} color="#fffdf8" />
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.profileName}>Yeshey Zhennue</Text>
          <Text style={styles.profileRole}>SWE201 assignment workspace</Text>
        </View>
      </View>

      <View style={styles.tagRow}>
        {PROFILE_TAGS.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Settings</Text>
      {PROFILE_SETTINGS.map((setting) => (
        <View key={setting.label} style={styles.settingCard}>
          <Text style={styles.settingLabel}>{setting.label}</Text>
          <Text style={styles.settingValue}>{setting.value}</Text>
          <Text style={styles.settingNote}>{setting.note}</Text>
        </View>
      ))}

      <View style={styles.noticeCard}>
        <Text style={styles.noticeTitle}>Why this layout feels different</Text>
        <Text style={styles.noticeDetail}>
          The spacing, rounded surfaces, muted palette, and stronger typography
          are deliberate so the app feels like a finished mobile product instead
          of a default mockup.
        </Text>
      </View>
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
    marginTop: 8,
    marginBottom: 14,
    color: "#5d6675",
    lineHeight: 20,
  },
  profileCard: {
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
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: "#264653",
    alignItems: "center",
    justifyContent: "center",
  },
  profileCopy: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#132238",
  },
  profileRole: {
    marginTop: 4,
    color: "#5d6675",
    fontWeight: "600",
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
    marginBottom: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#fffdf8",
    borderWidth: 1,
    borderColor: "#eadfce",
  },
  tagText: {
    color: "#445366",
    fontSize: 12,
    fontWeight: "700",
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "900",
    color: "#132238",
  },
  settingCard: {
    backgroundColor: "#fffdf8",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "#eadfce",
    marginBottom: 10,
  },
  settingLabel: {
    color: "#6b7280",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  settingValue: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "800",
    color: "#132238",
  },
  settingNote: {
    marginTop: 6,
    color: "#5d6675",
    lineHeight: 19,
  },
  noticeCard: {
    backgroundColor: "#14213d",
    borderRadius: 24,
    padding: 18,
    marginTop: 8,
  },
  noticeTitle: {
    color: "#fffdf8",
    fontWeight: "900",
    fontSize: 17,
    marginBottom: 8,
  },
  noticeDetail: {
    color: "#d9e1ec",
    lineHeight: 20,
  },
});
