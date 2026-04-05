import React from "react";
import { Text, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ScreenProps = {
  navigation: any;
};

const Profile = (props: ScreenProps) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#006600", fontSize: 40 }}>Profile Screen!</Text>
      <Ionicons name="person-circle-outline" size={80} color="#006600" />
      
      <Button
        title="Go back Home"
        color="#006600"
        onPress={() => 
          props.navigation.navigate("Home")}
      />
    </View>
  );
};

export default Profile;