import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { baseUrl } from "../../../constants/constants";
import api from "../../../Services/AuthService";

import { useAuthContext } from "../../../hooks/useAuthContext";
import { LineChart } from "react-native-chart-kit";

function WeightGraph() {
  const { user } = useAuthContext();
  const [details, setDetails] = useState([]);

  const [id, setId] = useState();

  useEffect(() => {
    if (user && user._id) {
      getWeights(user._id);
    }
  }, [user]);

  const getWeights = (userId) => {
    api
      .get(`${baseUrl}/patients/${userId}`)
      .then((response) => {
        const weights = response.data.pastWeights || [];

        setDetails(weights);
        console.log("Weight Details: ", weights);
        console.log("Weight: ", response.data.weight);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };

  const safeDetails = Array.isArray(details) ? details : [];

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

  const weights = safeDetails.map((entry) => entry.weight);
  console.log(weights);
  // Extract the first and last dates for the date range display
  const firstDate = datesNew.length > 0 ? datesNew[0] : null;
  const lastDate = datesNew.length > 0 ? datesNew[datesNew.length - 1] : null;

  const totalWeight = weights.reduce((a, b) => a + b, 0);
  console.log("Sum of Weights: ", totalWeight);
  let sum = 0;
  let num = totalWeight;

  while (num !== 0) {
    sum += num % 100;
    num = Math.floor(num / 100);
  }
  console.log("Sum of Digits of Total Weight: ", sum);

  const averageWeight = sum / weights.length;
  // Format to 1 decimal place using Math.round
  const averageWeightFormatted = (
    Math.round(averageWeight * 10) / 10
  ).toString();
  const minWeight = weights.length > 0 ? Math.min(...weights) : null;
  const maxWeight = weights.length > 0 ? Math.max(...weights) : null;

  if (weights.length !== 1) {
    return (
      <View style={styles.container}>
        {details.length === 0 && <Text>No data to show.</Text>}
        <View style={styles.dateContainer}>
          {firstDate && lastDate && (
            <Text style={styles.dateRange}>
              {firstDate} – {lastDate} ({details.length} records)
            </Text>
          )}
        </View>
        {averageWeightFormatted && minWeight && maxWeight && (
          <View style={styles.statsContainer}>
            <View style={styles.statsSubContainer}>
              <Text style={styles.statsText}>Avg</Text>
              <Text style={styles.statsNumAvg}>
                {averageWeightFormatted} kg
              </Text>
            </View>
            <View style={styles.statsSubContainer}>
              <Text style={styles.statsText}>Min</Text>
              <Text style={styles.statsNumMIn}>{minWeight} kg</Text>
              <Text style={styles.statsText}>Max</Text>
              <Text style={styles.statsNumMax}>{maxWeight} kg</Text>
            </View>
          </View>
        )}
        {details.length > 0 ? (
          <LineChart
            data={{
              labels: dates,

              datasets: [
                {
                  data: weights,
                },
              ],
            }}
            width={Dimensions.get("window").width - 16}
            height={240}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#36bfb6",
              backgroundGradientFrom: "#ffa726",
              backgroundGradientTo: "#42ebe0",

              decimalPlaces: 0,

              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForBackgroundLines: {
                stroke: "",
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "black",
                fill: "black",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        ) : (
          <Text>No weight data available</Text>
        )}
      </View>
    );
  } else {
    return null;
  }
}
export default WeightGraph;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 20,
  },
  dateContainer: {
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  dateRange: {
    color: "black",
    fontSize: 16,
    marginBottom: 10,
  },
  statsContainer: {
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 30,
    flexDirection: "row",
    marginTop: 0,
  },
  statsSubContainer: {
    flexDirection: "row",
    marginRight: 20,
    alignItems: "baseline",
  },
  statsText: {
    fontSize: 16,
    color: "black",
    marginRight: 5,
  },
  statsNumAvg: {
    fontSize: 24,
    color: "green",
  },
  statsNumMIn: {
    fontSize: 24,
    color: "gold",
    marginRight: 10,
  },
  statsNumMax: {
    fontSize: 24,
    color: "red",
    marginRight: 10,
  },

  overlay: {
    position: "absolute",
    left: -10,
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
    top: 258,
    left: 150,
    paddingBottom: 10,
  },
});
