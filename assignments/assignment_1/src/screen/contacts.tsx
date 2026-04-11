import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Contact,
  MainTabParamList,
  RootStackParamList,
} from "../navigation/types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Contacts">,
  NativeStackScreenProps<RootStackParamList>
>;

const CONTACTS: Contact[] = [
  {
    id: "1",
    name: "IT Helpdesk",
    department: "Information Technology",
    phone: "+975-02-123456",
    email: "helpdesk.cst@rub.edu.bt",
    room: "Admin Block - Room 101",
  },
  {
    id: "2",
    name: "Student Services",
    department: "Student Affairs",
    phone: "+975-02-123457",
    email: "studentservices.cst@rub.edu.bt",
    room: "Main Office - Room 204",
  },
  {
    id: "3",
    name: "Library Desk",
    department: "Library",
    phone: "+975-02-123458",
    email: "library.cst@rub.edu.bt",
    room: "Library Ground Floor",
  },
  {
    id: "4",
    name: "Campus Security",
    department: "Security Office",
    phone: "+975-02-123459",
    email: "security.cst@rub.edu.bt",
    room: "Gate Office",
  },
];

export default function Contacts({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const isCompact = width < 380;

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Important Contacts</Text>
      <Text style={styles.subheading}>Tap any contact to view details.</Text>

      <FlatList
        data={CONTACTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, isCompact && styles.compactCard]}
            onPress={() =>
              navigation.navigate("ContactDetails", { contact: item })
            }
          >
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.metaText}>{item.department}</Text>
            <Text style={styles.metaText}>{item.phone}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
  },
  subheading: {
    marginTop: 4,
    marginBottom: 12,
    color: "#4b5563",
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#dbe2ea",
  },
  compactCard: {
    padding: 12,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  metaText: {
    color: "#374151",
    marginBottom: 2,
  },
});
