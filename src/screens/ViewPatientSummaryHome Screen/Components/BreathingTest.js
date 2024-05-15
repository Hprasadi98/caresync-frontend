import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import axios from "axios";
import { baseUrl } from "../../../constants/constants";
import { DataTable } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";

function BreathingTest() {
  const [testResult, setTestResult] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTestData, setSelectedTestData] = useState([]);

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

  const testResultGraphModal = (data) => {
    // Sort the data based on date in ascending order
    const sortedData = data
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    setSelectedTestData(sortedData);
    setModalVisible(true);
  };

  // Function to extract month and day from the date
  const extractMonthAndDay = (date) => {
    console.log("Date: ", date);
    const day = date.substring(0, 2);
    const month = date.substring(3,5);
  
    // Combine day and month components
    const formattedDate = `${month}/${day}`;
    console.log("Formatted Date: ", formattedDate);
  
    return formattedDate;
  };

  // Function to map stopwatch time to scale
  const mapStopwatchTimeToScale = (stopwatchTime) => {
    const lastTwoDigits = parseInt(stopwatchTime.slice(-2)); // Extract last two digits
    return lastTwoDigits; // Map it to a scale of 0 to 20
  };

  return (
    <View style={styles.container}>
      <View style={styles.titlecontainer}>
        <Text style={styles.title}>Breathing Test</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => testResultGraphModal(testResult)}
        >
          <Text>View</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tablecontainer}>
        <Text style={styles.headtext}>Past Results</Text>
        <View style={styles.subson}>
          <Text style={styles.text}>Test Date</Text>
          <Text style={styles.text}>Time (H:M:S)</Text>
        </View>
      </View>
      <DataTable>
        {testResult.map((data, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell
              style={{
                justifyContent: "center",
                backgroundColor: "#DEFFFB",
                marginBottom: 5,
                paddingRight: 10,
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
              }}
            >
              {data.date}
            </DataTable.Cell>
            <DataTable.Cell
              style={{
                justifyContent: "center",
                backgroundColor: "#DEFFFB",
                marginBottom: 5,
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              {data.stopwatchTime}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Breathing Test Graph</Text>
            <LineChart
              data={{
                labels: selectedTestData
      .map((data) => extractMonthAndDay(data.date))
      .reverse(),
                datasets: [
                  {
                    data: selectedTestData.map((data) =>
                      mapStopwatchTimeToScale(data.stopwatchTime)
                
                    )
                    .reverse(),
                    
                  },
                ],
              }}
              width={300}
              height={200}
              yAxisLabel=""
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  button: {
    backgroundColor: "#FBDABB",
    height: 30,
    width: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    top: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#FBDABB",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default BreathingTest;
