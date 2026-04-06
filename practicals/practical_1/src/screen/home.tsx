import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Home(props: any) {
  return (
    <View style={styles.container}>
      <Text>Home Screen!</Text>
      <StatusBar style="auto" />

        <Button
        title="Go to Profile"
        color="#006600"
        onPress={() =>
          props.navigation.navigate("Profile")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffee00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});