import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "ContactDetails">;

export default function ContactDetails({ route, navigation }: Props) {
  const { contact } = route.params;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{contact.name}</Text>
      <Text style={styles.value}>{contact.department}</Text>

      <View style={styles.detailCard}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{contact.phone}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{contact.email}</Text>

        <Text style={styles.label}>Office</Text>
        <Text style={styles.value}>{contact.room}</Text>
      </View>

      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back to Contacts</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
  },
  detailCard: {
    marginTop: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 16,
  },
  label: {
    color: "#6b7280",
    fontSize: 13,
    marginTop: 10,
  },
  value: {
    color: "#111827",
    fontSize: 16,
    marginTop: 2,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1d4ed8",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
