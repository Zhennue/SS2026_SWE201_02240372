import React, { useEffect, useRef } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Animations() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.96)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 12,
        stiffness: 120,
      }),
    ]).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(progressAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: false,
        }),
      ]),
    );

    pulse.start();

    return () => {
      pulse.stop();
    };
  }, [fadeAnim, progressAnim, scaleAnim]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
          damping: 14,
          stiffness: 140,
        }).start();
      },
    }),
  ).current;

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["18%", "92%"],
  });

  return (
    <Animated.ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={[
          styles.hero,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={styles.kicker}>Animation demo</Text>
        <Text style={styles.heading}>Motion that feels intentional.</Text>
        <Text style={styles.subheading}>
          This screen covers fade, scale, progress motion, and a drag gesture
          without looking like a canned demo.
        </Text>
      </Animated.View>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <Ionicons name="pulse-outline" size={18} color="#2a9d8f" />
          <Text style={styles.panelTitle}>Animated progress indicator</Text>
        </View>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, { width: progressWidth }]}
          />
        </View>
        <Text style={styles.panelNote}>
          Looping motion gives the page a subtle live feel.
        </Text>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <Ionicons name="move-outline" size={18} color="#e76f51" />
          <Text style={styles.panelTitle}>Drag the focus card</Text>
        </View>
        <Text style={styles.panelNote}>
          Pull the card around and release it to spring back.
        </Text>
        <Animated.View
          style={[
            styles.draggableCard,
            {
              transform: [
                { translateX: pan.x },
                { translateY: pan.y },
                {
                  rotate: pan.x.interpolate({
                    inputRange: [-120, 0, 120],
                    outputRange: ["-8deg", "0deg", "8deg"],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.draggableIcon}>
            <Ionicons name="paper-plane-outline" size={18} color="#fffdf8" />
          </View>
          <Text style={styles.draggableTitle}>Move me gently</Text>
          <Text style={styles.draggableText}>
            A simple drag gesture helps prove the app supports touch
            interaction.
          </Text>
        </Animated.View>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <Ionicons name="sparkles-outline" size={18} color="#264653" />
          <Text style={styles.panelTitle}>Tap animation cue</Text>
        </View>
        <Pressable
          style={styles.tapChip}
          onPress={() =>
            Animated.sequence([
              Animated.spring(scaleAnim, {
                toValue: 1.04,
                useNativeDriver: true,
                damping: 10,
                stiffness: 220,
              }),
              Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                damping: 12,
                stiffness: 120,
              }),
            ]).start()
          }
        >
          <Text style={styles.tapChipText}>Tap to bounce the intro card</Text>
        </Pressable>
      </View>
    </Animated.ScrollView>
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
    gap: 12,
  },
  hero: {
    backgroundColor: "#14213d",
    borderRadius: 28,
    padding: 18,
  },
  kicker: {
    color: "#ffd8ab",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  heading: {
    marginTop: 8,
    color: "#fffdf8",
    fontSize: 28,
    lineHeight: 33,
    fontWeight: "900",
  },
  subheading: {
    marginTop: 8,
    color: "#d9e1ec",
    lineHeight: 20,
    fontWeight: "500",
  },
  panel: {
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
  panelHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#132238",
  },
  panelNote: {
    marginTop: 8,
    color: "#5d6675",
    lineHeight: 19,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#ece4d6",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#2a9d8f",
  },
  draggableCard: {
    marginTop: 14,
    backgroundColor: "#264653",
    borderRadius: 22,
    padding: 16,
  },
  draggableIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  draggableTitle: {
    color: "#fffdf8",
    fontSize: 16,
    fontWeight: "800",
  },
  draggableText: {
    marginTop: 6,
    color: "#d9e1ec",
    lineHeight: 19,
  },
  tapChip: {
    marginTop: 6,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: "#f2efe9",
    alignItems: "center",
  },
  tapChipText: {
    color: "#14213d",
    fontWeight: "800",
    textAlign: "center",
  },
});
