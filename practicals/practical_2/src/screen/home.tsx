import React from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const isWideLayout = width >= 600;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Home Dashboard</Text>
        <Text style={styles.subtitle}>
          This layout uses flexible containers so it adapts to phones and
          tablets.
        </Text>

        <View style={[styles.cardGrid, isWideLayout && styles.cardGridWide]}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tasks Today</Text>
            <Text style={styles.cardText}>
              On narrow devices, cards stack vertically. On wider screens, they
              sit side by side.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Schedule</Text>
            <Text style={styles.cardText}>
              Flexible widths and padding keep text readable across different
              orientations.
            </Text>
          </View>
        </View>

        <View style={styles.fullWidthSection}>
          <Text style={styles.sectionTitle}>Quick Notes</Text>
          <Text style={styles.sectionText}>
            This full-width section demonstrates responsive spacing without
            fixed pixel dimensions.
          </Text>
        </View>

        <View style={styles.buttonArea}>
          <Button
            title="Open Profile"
            onPress={() => navigation.navigate("Profile")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  screenContainer: {
    flex: 1,
    width: "100%",
    padding: 16,
    backgroundColor: "#f1f5f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#334155",
    textAlign: "center",
    marginBottom: 16,
  },
  cardGrid: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 16,
  },
  cardGridWide: {
    flexDirection: "row",
  },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 20,
  },
  fullWidthSection: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 20,
  },
  buttonArea: {
    marginTop: 20,
    alignItems: "center",
  },
});
