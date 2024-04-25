import { Text, StyleSheet, FlatList, View, ScrollView } from "react-native";
import Header2 from "../Components/Header2";
import BreathingTest from "../Components/BreathingTest";
import StepCounterTest from "../Components/StepCounterTest";

function TestResultScreen() {
  return (
    <View style={styles.container}>
    <Header2 text="Test Results" />
    <ScrollView >

      <BreathingTest />
      <StepCounterTest />
    </ScrollView>
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
