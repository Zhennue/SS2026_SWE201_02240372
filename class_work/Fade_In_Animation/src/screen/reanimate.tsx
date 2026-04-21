import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ReanimateExample: React.FC = () => {
  const offset = useSharedValue(0);

  // Worklet: runs on the UI thread.
  const addWorklet = (a: number, b: number): number => {
    "worklet";
    return a + b;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const moveRight = () => {
    runOnUI(() => {
      "worklet";
      const destination = addWorklet(120, 80);
      offset.value = withTiming(destination, { duration: 500 });
    })();
  };

  const resetPosition = () => {
    offset.value = withTiming(0, { duration: 400 });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Text style={styles.label}>Move me with a worklet</Text>
      </Animated.View>

      <View style={styles.actions}>
        <Pressable onPress={moveRight} style={styles.button}>
          <Text style={styles.buttonText}>Move Right</Text>
        </Pressable>
        <Pressable
          onPress={resetPosition}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 24,
    backgroundColor: "#F3F7FF",
  },
  box: {
    width: 220,
    height: 110,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFA02E",
  },
  label: {
    fontSize: 16,
    color: "#1A1A2E",
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonSecondary: {
    backgroundColor: "#334155",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ReanimateExample;
