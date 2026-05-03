import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  subtitle: string;
  detail: string;
  accent: string;
  icon: string;
  meta?: string;
  onPress?: () => void;
};

export default function FeatureCard({
  title,
  subtitle,
  detail,
  accent,
  icon,
  meta,
  onPress,
}: Props) {
  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && onPress ? styles.cardPressed : null,
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: `${accent}18` }]}>
        <Ionicons
          name={icon as React.ComponentProps<typeof Ionicons>["name"]}
          size={20}
          color={accent}
        />
      </View>
      <View style={styles.textBlock}>
        <View style={styles.row}>
          <Text style={styles.title}>{title}</Text>
          {meta ? (
            <Text style={[styles.meta, { color: accent }]}>{meta}</Text>
          ) : null}
        </View>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fffdf8",
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    gap: 14,
    borderWidth: 1,
    borderColor: "#e7ddd0",
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.96,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  textBlock: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "800",
    color: "#132238",
  },
  meta: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#6b7280",
    fontWeight: "600",
  },
  detail: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    color: "#475569",
  },
});
