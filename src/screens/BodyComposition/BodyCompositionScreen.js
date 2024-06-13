import { View, StyleSheet, Text } from "react-native";
import Header from "../../components/Header";
import WeightGraph from "./Components/WeightGraph";

function BodyCompositionScreen() {
  return (
    <View style={styles.container}>
      <Header name="Body Composition" />
      <View styles={styles.weightcontainer}>
        <Text style={styles.text}>Weight</Text>
        <WeightGraph />
      </View>
    </View>
  );
}

export default BodyCompositionScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weightcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
  },
});
