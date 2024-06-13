import { ScrollView, View, StyleSheet, Text } from "react-native";
import Header from "../../components/Header";
import WeightGraph from "./Components/WeightGraph";
import BMIGraph from "./Components/BMIGraph";
import BMIScale from "./Components/BMIScale";

function BodyCompositionScreen() {
  return (
    <View style={styles.container}>
      <Header name="Body Composition" />
      <ScrollView style={styles.subcontainer}>
        <View styles={styles.weightcontainer}>
          <Text style={styles.text}>Weight Graph</Text>
          <WeightGraph />
        </View>
        <View styles={styles.bmicontainer}>
          <Text style={styles.text}>BMI Graph</Text>
          <BMIGraph />
        </View>
      </ScrollView>
    </View>
  );
}

export default BodyCompositionScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subcontainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  weightcontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
  },
  bmicontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
