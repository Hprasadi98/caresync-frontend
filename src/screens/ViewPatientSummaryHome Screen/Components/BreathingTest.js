import { Text, StyleSheet, FlatList, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../constants/constants";
import { DataTable } from "react-native-paper";

function BreathingTest() {
  const [testResult, setTestResult] = useState([]);

  useEffect(() => {
    fetchTestResults();
  }, []);

  const fetchTestResults = async () => {
    try {
      const response = await axios.get(`${baseUrl}/breathingTests`);
      console.log("Response from backend:", response.data);
      setTestResult(response.data);
    } catch (error) {
      console.error("Error fetching testResults:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titlecontainer}>
        <Text style={styles.title}>Breathing Test</Text>
      </View>
      <View style={styles.tablecontainer}>
        <Text style={styles.headtext}>Past Results</Text>
        <View style={styles.subson}>
          <Text style={styles.text}> Test Date</Text>
          <Text style={styles.text}> Time (H:M:S)</Text>
        </View>
      </View>
    




<DataTable>
        
        {testResult.map((data, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={{ justifyContent: "center",backgroundColor:"#DEFFFB",marginBottom:5,paddingRight:10,borderBottomLeftRadius:10,borderTopLeftRadius:10 }}>
              {data.date}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: "center",backgroundColor:"#DEFFFB",marginBottom:5 ,borderBottomRightRadius:10,borderTopRightRadius:10}}>
              {data.stopwatchTime}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
}
export default BreathingTest;
const styles = StyleSheet.create({
  container: {

    backgroundColor: "#fff",
  },
  titlecontainer: {

    marginTop: 15,

    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 20,
  },
  tablecontainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEFFFB",
    marginTop: 10,
    margin: "4%",
    marginBottom: 10,
    borderRadius: 20,
  },
  headtext: {
    fontSize: 20,
    padding: 10,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  subson: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    margin: 10,
  },
  text: {
    fontSize: 14,
    padding: 10,
    justifyContent: "center",
    fontWeight: "bold",
  },
  rowContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEFFFB",
    marginTop: 10,
    margin: "10%",
    borderRadius: 20,

  },
});
