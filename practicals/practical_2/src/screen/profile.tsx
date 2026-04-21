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

export default function Profile() {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const isWideLayout = width >= 600;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Profile Overview</Text>
        <Text style={styles.subtitle}>
          Content sections reflow using breakpoints and flexible containers.
        </Text>

        <View
          style={[styles.rowWrapper, isWideLayout && styles.rowWrapperWide]}
        >
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>User Details</Text>
            <Text style={styles.sectionText}>
              Name, email, and contact details can be displayed in a readable
              block with adaptive width.
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <Text style={styles.sectionText}>
              Settings and preferences are grouped here and remain usable on
              both portrait and landscape views.
            </Text>
          </View>
        </View>

        <View style={styles.activityBox}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Text style={styles.sectionText}>
            This section stays full width and preserves spacing to avoid clipped
            text on smaller screens.
          </Text>
        </View>

        <View style={styles.buttonArea}>
          <Button title="Go Back Home" onPress={() => navigation.goBack()} />
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
    backgroundColor: "#eef2ff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e1b4b",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#3730a3",
    textAlign: "center",
    marginBottom: 16,
  },
  rowWrapper: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 16,
  },
  rowWrapperWide: {
    flexDirection: "row",
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  activityBox: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e1b4b",
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 14,
    color: "#312e81",
    lineHeight: 20,
  },
  buttonArea: {
    marginTop: 20,
    alignItems: "center",
  },
});
