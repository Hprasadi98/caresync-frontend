import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { baseUrl } from "../../../constants/constants";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { LineChart } from "react-native-chart-kit";

function BMIGraph() {
  const { user } = useAuthContext();
  const [details, setDetails] = useState([]);
  const [height, setHeight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user._id) {
      getWeights(user._id);
    }
  }, [user]);

  const getWeights = (userId) => {
    axios
      .get(`${baseUrl}/patients/${userId}`)
      .then((response) => {
        const weights = response.data.pastWeights || [];
        setDetails(weights);
        setHeight(response.data.height);
        setLoading(false);
        console.log("Weight Details: ", weights);
        console.log("Height: ", response.data.height);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
        setLoading(false);
      });
  };

  // Ensure details is always an array
  const safeDetails = Array.isArray(details) ? details : [];

  // Memoize BMI calculations to avoid unnecessary re-computation
  const bmiValues = useMemo(() => {
    console.log("Height: ", height);
    if (!height) return [];
    const heightInMeters = height / 100; // Convert height to meters
    return safeDetails.map((entry) => {
      const bmi = entry.weight / (heightInMeters * heightInMeters);
      return parseFloat(bmi.toFixed(2)); // Return BMI with 2 decimal places
    });
  }, [safeDetails, height]);

  // Extract dates for the graph
  const dates = safeDetails.map((entry) =>
    new Date(entry.date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    })
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : details.length > 0 ? (
        <LineChart
          data={{
            labels: dates,
            datasets: [
              {
                data: bmiValues,
              },
            ],
          }}
          width={Dimensions.get("window").width - 16} // from react-native
          height={240}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // Display 2 decimal places for BMI
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
            yAxisMinimum: Math.min(...bmiValues) - 5, // Adjust y-axis minimum for better visualization
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text>No weight data available.</Text>
      )}
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>BMI</Text>
      </View>
      <View style={styles.overlayDate}>
        <Text style={styles.overlayTextDate}>Month/Day</Text>
      </View>
    </View>
  );
}

export default BMIGraph;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 20,
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
    width: "90%",
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
  overlay: {
    position: "absolute",
    top: 120, // Adjust as needed
    left: -10, // Adjust as needed
  },
  overlayText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    transform: [{ rotate: "-90deg" }],
  },
  overlayTextDate: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  overlayDate: {
    position: "absolute",
    top: 228, // Adjust as needed
    left: 150, // Adjust as needed
    paddingBottom: 10,
  },
});
