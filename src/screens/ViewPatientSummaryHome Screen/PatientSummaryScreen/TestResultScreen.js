import { Text, StyleSheet, FlatList, View } from "react-native";
import Header2 from "../Components/Header2";
import BreathingTest from "../Components/BreathingTest";
function TestResultScreen() {
  return (
    <View style={styles.container}>
      <Header2 text="Test Results" />
      <BreathingTest />
    </View>
  );
}
export default TestResultScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F7FF",
  },
});
