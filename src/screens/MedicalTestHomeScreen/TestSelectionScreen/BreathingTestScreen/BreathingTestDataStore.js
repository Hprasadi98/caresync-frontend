import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";

const BreathingTestDataStore = () => {
  const sampleData = [
    { date: "12/04/2023", time: "00:01:00" },
    { date: "12/04/2023", time: "00:01:00" },
    { date: "12/04/2023", time: "00:01:00" },
  ];

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headtext}>Past Results</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ justifyContent: "center" }}>
              Test Date
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: "center" }}>
              Time (H:M:S)
            </DataTable.Title>
          </DataTable.Header>

          {sampleData.map((data, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell style={{ justifyContent: "center" }}>
                {data.date}
              </DataTable.Cell>
              <DataTable.Cell style={{ justifyContent: "center" }}>
                {data.time}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
      <View style={styles.resetTable}>
        <Text style={{ color: "#990000" }}>Reset</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEFFFB",
    marginTop: 10,
    margin: "10%",
    borderRadius: 20,
  },
  headtext: {
    fontSize: 25,
    padding: 10,
    paddingBottom: 0,
  },
  resetTable: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BreathingTestDataStore;
