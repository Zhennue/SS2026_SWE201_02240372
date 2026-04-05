import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ScreenProps = {
  navigation: any;
};

const Home = (props: ScreenProps) => {
  const [input, setInput] = useState("");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#006600", fontSize: 40 }}>Home Screen!</Text>
      <Ionicons name="home" size={80} color="#006600" />

      <Button
        title="Go to Profile"
        color="#006600"
        onPress={() =>
          props.navigation.navigate("Profile")
        }
      />
    </View>
  );
};

export default Home;