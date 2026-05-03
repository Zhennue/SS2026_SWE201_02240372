import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const MyComponent = () => {
  const offset = useSharedValue(0);

  // This runs on the UI thread — no bridge needed
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const moveRight = () => {
    // withTiming smoothly animates to the new value
    offset.value = withTiming(200, { duration: 500 });
  };

  return (
    <Animated.View style={[styles.box, animatedStyle]}>
      <TouchableOpacity onPress={moveRight}>
        <Text>Move Right</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 180,
    height: 80,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});

export default MyComponent;