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
import { Ionicons } from "@expo/vector-icons";
import { MENU_ITEMS } from "../data/studentAppData";
import { MainTabParamList, RootStackParamList } from "../navigation/types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Menu">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function Contacts({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const isCompact = width < 380;

  return (
    <View style={styles.screen}>
      <Text style={styles.kicker}>Category menu</Text>
      <Text style={styles.heading}>Pick the next thing to work on.</Text>
      <Text style={styles.subheading}>
        These cards feel like a real app menu instead of a static assignment
        list.
      </Text>

      <FlatList
        data={MENU_ITEMS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, isCompact && styles.compactCard]}
            onPress={() => navigation.navigate("Detail", { item })}
          >
            <View
              style={[
                styles.iconBubble,
                { backgroundColor: `${item.accent}18` },
              ]}
            >
              <Ionicons
                name={
                  item.icon as React.ComponentProps<typeof Ionicons>["name"]
                }
                size={18}
                color={item.accent}
              />
            </View>
            <View style={styles.cardBody}>
              <View style={styles.row}>
                <Text style={styles.contactName}>{item.title}</Text>
                <Text style={[styles.metaBadge, { color: item.accent }]}>
                  {item.time}
                </Text>
              </View>
              <Text style={styles.metaText}>{item.subtitle}</Text>
              <Text style={styles.detailText}>{item.details}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5efe6",
    paddingHorizontal: 18,
    paddingTop: 18,
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
  listContent: {
    paddingBottom: 28,
    gap: 12,
  },
  card: {
    backgroundColor: "#fffdf8",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#eadfce",
    flexDirection: "row",
    gap: 14,
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 2,
  },
  compactCard: {
    padding: 12,
  },
  iconBubble: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 3,
  },
  cardBody: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  contactName: {
    flex: 1,
    fontSize: 17,
    fontWeight: "800",
    color: "#132238",
  },
  metaBadge: {
    fontSize: 12,
    fontWeight: "800",
  },
  metaText: {
    color: "#637083",
    marginTop: 6,
    fontWeight: "600",
  },
  detailText: {
    marginTop: 8,
    lineHeight: 19,
    color: "#475569",
  },
});
