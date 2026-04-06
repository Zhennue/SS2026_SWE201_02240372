import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Profile(props: any) {
  return (
    <View style={styles.container}>
      <Text>Profile Screen!</Text>
      <StatusBar style="auto" />

      <Button
        title="Go to Home"
        color="#006600"
        onPress={() => 
          props.navigation.navigate("Home")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#800080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});