import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { baseUrl } from "../../../constants/constants";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { LineChart } from "react-native-chart-kit";
import BMIScale from "./BMIScale";

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
    //useMemo is a React hook that helps optimize performance by memoizing the results of expensive computations
    console.log("Height: ", height);
    if (!height) return [];
    const heightInMeters = height / 100; // Convert height to meters
    return safeDetails.map((entry) => {
      const bmi = entry.weight / (heightInMeters * heightInMeters);
      return parseFloat(bmi.toFixed(2)); // Return BMI with 2 decimal places
    });
  }, [safeDetails, height]);
  console.log("BMI Values: ", bmiValues);

  // Calculate average, min, and max BMI
  const averageBMI = useMemo(() => {
    if (bmiValues.length === 0) return 0;
    const totalBMI = bmiValues.reduce((acc, bmi) => acc + bmi, 0);
    return (totalBMI / bmiValues.length).toFixed(2); // Format to 2 decimal places
  }, [bmiValues]);
  console.log("Average BMI: ", averageBMI);

  const minBMI = useMemo(() => {
    return bmiValues.length > 0 ? Math.min(...bmiValues).toFixed(2) : null;
  }, [bmiValues]);

  const maxBMI = useMemo(() => {
    return bmiValues.length > 0 ? Math.max(...bmiValues).toFixed(2) : null;
  }, [bmiValues]);

  // Extract dates for the graph
  const dates = safeDetails.map((entry) =>
    new Date(entry.date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    })
  );
  const datesNew = safeDetails.map(
    (entry) =>
      new Date(entry.date)
        .toLocaleDateString("en-GB", {
          month: "short",
          day: "2-digit",
        })
        .replace(/\s/g, " ") //replace day and month
  );

  // Extract the first and last dates for the date range display
  const firstDate = datesNew.length > 0 ? datesNew[0] : null;
  const lastDate = datesNew.length > 0 ? datesNew[datesNew.length - 1] : null;

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        {firstDate && lastDate && (
          <Text style={styles.dateRange}>
            {firstDate} – {lastDate} ({details.length} records)
          </Text>
        )}
      </View>

      {/* {averageBMI && minBMI && maxBMI && ( */}
      <View style={styles.statsContainer}>
        <View style={styles.statsSubContainer}>
          <Text style={styles.statsText}>Avg</Text>
          <Text style={styles.statsNumAvg}>{averageBMI}</Text>
        </View>
        <View style={styles.statsSubContainer}>
          <Text style={styles.statsText}>Min</Text>
          <Text style={styles.statsNumMIn}>{minBMI}</Text>
          <Text style={styles.statsText}>Max</Text>
          <Text style={styles.statsNumMax}>{maxBMI}</Text>
        </View>
        {/* )} */}
      </View>

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
            backgroundColor: "#bf766f",
            backgroundGradientFrom: "#ffa726",
            backgroundGradientTo: "#eda6e6",
            decimalPlaces: 2, // Display 2 decimal places for BMI
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              stroke: "", // Color for background lines
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "",
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

      {/* <View style={styles.overlay}>
        <Text style={styles.overlayText}>BMI</Text>
      </View>
      <View style={styles.overlayDate}>
        <Text style={styles.overlayTextDate}>Month/Day</Text>
      </View> */}
      <BMIScale bmi={bmiValues[bmiValues.length - 1]} />
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
  dateContainer: {
    alignSelf: "flex-start", // Align text to the start (left)
    marginLeft: 30, // Add some padding from the left sides
  },
  dateRange: {
    color: "black", // Adjust color to match your theme
    fontSize: 16,
    marginBottom: 10, // Space between the text and the graph
  },
  statsContainer: {
    marginBottom: 10, // Space between the stats and the graph
    alignSelf: "flex-start", // Align text to the start (left)
    marginLeft: 30, // Add some padding from the left sides
    flexDirection: "row", // Align the stats in a row
    marginTop: 0, // Space between the text and the graph
  },
  statsSubContainer: {
    flexDirection: "row", // Align the stats in a row
    marginRight: 20, // Space between the stats
    alignItems: "baseline", // Align the text in the center
  },
  statsText: {
    fontSize: 16,
    color: "black",
    marginRight: 5, // Space between the stats
  },
  statsNumAvg: {
    fontSize: 24,
    color: "green",
  },
  statsNumMIn: {
    fontSize: 24,
    color: "gold",
    marginRight: 10, // Space between the stats
  },
  statsNumMax: {
    fontSize: 24,
    color: "red",
    marginRight: 10, // Space between the stats
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
    left: 6, // Adjust as needed
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
