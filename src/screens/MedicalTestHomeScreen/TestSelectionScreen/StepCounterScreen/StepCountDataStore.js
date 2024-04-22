import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const StepCountDataStore = ({sampleData}) => {
  //no data return null
  if(!sampleData){
    return null;
  }
  return (
    <GestureHandlerRootView>
    <View style={styles.container}>
      <Text style={styles.headtext}>Past Results</Text>
      <ScrollView horizontal={true}>
      <DataTable>
        <DataTable.Header>
        <DataTable.Title style={styles.headcellsStyle}>
            Date
          </DataTable.Title>
          <DataTable.Title style={styles.headcellsStyle}>
            Time (H:M:S)
          </DataTable.Title>
          <DataTable.Title style={styles.headcellsStyle}>
            Steps
          </DataTable.Title>
          <DataTable.Title style={styles.headcellsStyle}>
            Distance (km)
          </DataTable.Title>
          <DataTable.Title style={styles.headcellsStyle}>
            Calaries (cal)
          </DataTable.Title>
          <DataTable.Title>    </DataTable.Title>
        </DataTable.Header>
        
        {sampleData.map((data, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={styles.cellsStyle}>
              {data.date}
            </DataTable.Cell>
            <DataTable.Cell style={styles.cellsStyle}>
              {data.stopwatchTime}
            </DataTable.Cell>
            <DataTable.Cell style={styles.cellsStyle}>
              {data.steps}
            </DataTable.Cell>
            <DataTable.Cell style={styles.cellsStyle}>
              {data.distance}
            </DataTable.Cell>
            <DataTable.Cell style={styles.cellsStyle}>
              {data.distance}
            </DataTable.Cell>
            <DataTable.Cell>
              
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      </ScrollView>
    </View>
</GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEFFFB",
    marginTop: 10,
    margin: "5%",
    borderRadius: 20,
  },
  headtext: {
    fontSize: 25,
    padding: 10,
    paddingBottom: 0,
  },
  cellsStyle: {
    justifyContent: "center",
    alignContent: "center",
    paddingRight: 15,
  },
  headcellsStyle: {
    paddingRight: 30,
    paddingLeft: 20,
  },
});

export default StepCountDataStore;
