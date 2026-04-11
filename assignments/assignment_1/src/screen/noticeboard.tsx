import React from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const NOTICES = [
  {
    id: "n1",
    title: "Orientation Week",
    detail: "Welcome sessions start Monday at 9:00 in the Auditorium.",
  },
  {
    id: "n2",
    title: "Library Workshop",
    detail: "How to use digital journals effectively. Thursday 2:00 PM.",
  },
  {
    id: "n3",
    title: "Sports Trials",
    detail: "Football and basketball team selections this Friday evening.",
  },
];

export default function NoticeBoard() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.heading}>Notice Board</Text>
      <Text style={styles.subheading}>
        Campus updates and useful map links.
      </Text>

      {NOTICES.map((notice) => (
        <View key={notice.id} style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>{notice.title}</Text>
          <Text style={styles.noticeDetail}>{notice.detail}</Text>
        </View>
      ))}

      <Pressable
        style={styles.linkButton}
        onPress={() =>
          Linking.openURL(
            "https://maps.google.com/?q=College+of+Science+and+Technology+Bhutan",
          )
        }
      >
        <Text style={styles.linkText}>Open Campus Location in Maps</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fefce8",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#854d0e",
  },
  subheading: {
    marginTop: 4,
    marginBottom: 14,
    color: "#713f12",
  },
  noticeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fde68a",
    padding: 14,
    marginBottom: 10,
  },
  noticeTitle: {
    color: "#92400e",
    fontWeight: "700",
    fontSize: 17,
    marginBottom: 6,
  },
  noticeDetail: {
    color: "#3f3f46",
  },
  linkButton: {
    marginTop: 8,
    backgroundColor: "#f59e0b",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  linkText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});
