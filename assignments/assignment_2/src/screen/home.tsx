import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import FeatureCard from "../components/FeatureCard";
import { QUICK_STATS } from "../data/studentAppData";
import { MainTabParamList } from "../navigation/types";

type Props = BottomTabScreenProps<MainTabParamList, "Home">;

export default function Home({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 390;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const riseAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 560,
        useNativeDriver: true,
      }),
      Animated.spring(riseAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 12,
        stiffness: 120,
      }),
    ]).start();
  }, [fadeAnim, riseAnim]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="dark" />
      <Animated.View
        style={[
          styles.hero,
          {
            opacity: fadeAnim,
            transform: [{ translateY: riseAnim }],
          },
        ]}
      >
        <View style={styles.heroTopRow}>
          <View>
            <Text style={styles.kicker}>Student productivity</Text>
            <Text style={styles.title}>Northstar Planner</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="sunny-outline" size={16} color="#b45309" />
            <Text style={styles.badgeText}>Focus day</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          A calm, practical app for staying on top of assignments, classes, and
          weekly routines.
        </Text>

        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>Today is 78% organized</Text>
        </View>
      </Animated.View>

      <View style={styles.statsRow}>
        {QUICK_STATS.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={[styles.statValue, { color: stat.tone }]}>
              {stat.value}
            </Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick access</Text>
        <Text style={styles.sectionNote}>Tap a card to move faster</Text>
      </View>

      <View style={styles.cardList}>
        <FeatureCard
          title="Open Menu"
          subtitle="Browse the assignment sections"
          detail="Use the category menu to jump into the items you need right now."
          accent="#2a9d8f"
          icon="grid-outline"
          meta="Menu"
          onPress={() => navigation.navigate("Menu")}
        />
        <FeatureCard
          title="Planner view"
          subtitle="See the week without clutter"
          detail="A simple timeline keeps the current semester work easy to scan."
          accent="#e76f51"
          icon="calendar-outline"
          meta="Plan"
          onPress={() => navigation.navigate("Planner")}
        />
        <FeatureCard
          title="Motion demo"
          subtitle="Animations and drag interaction"
          detail="A small interactive panel shows the movement requirements in one place."
          accent="#264653"
          icon="sparkles-outline"
          meta="Animate"
          onPress={() => navigation.navigate("Animations")}
        />
      </View>

      <Pressable
        style={[
          styles.primaryButton,
          isSmallDevice && styles.primaryButtonCompact,
        ]}
        onPress={() => navigation.navigate("Menu")}
      >
        <Text style={styles.primaryButtonText}>Start planning</Text>
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
    paddingTop: 20,
    paddingBottom: 36,
  },
  hero: {
    backgroundColor: "#fffdf8",
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: "#eadfce",
    shadowColor: "#1f2937",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 3,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: "#b45309",
  },
  title: {
    marginTop: 8,
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "900",
    color: "#14213d",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#fff2d8",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#b45309",
  },
  subtitle: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 22,
    color: "#546072",
  },
  progressWrap: {
    marginTop: 18,
    gap: 8,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#ece4d6",
    overflow: "hidden",
  },
  progressFill: {
    width: "78%",
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#2a9d8f",
  },
  progressText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6b7280",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fffdf8",
    borderWidth: 1,
    borderColor: "#eadfce",
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "900",
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
    color: "#667085",
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#14213d",
  },
  sectionNote: {
    marginTop: 4,
    fontSize: 13,
    color: "#6b7280",
  },
  cardList: {
    gap: 12,
  },
  primaryButton: {
    marginTop: 18,
    alignItems: "center",
    borderRadius: 18,
    paddingVertical: 15,
    backgroundColor: "#14213d",
    shadowColor: "#14213d",
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  primaryButtonCompact: {
    marginTop: 16,
  },
  primaryButtonText: {
    color: "#fffdf8",
    fontWeight: "800",
    fontSize: 15,
    letterSpacing: 0.2,
  },
});
