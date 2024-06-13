import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { baseUrl } from "../../../constants/constants";
import axios from "axios";

import { useAuthContext } from "../../../hooks/useAuthContext";
import { LineChart } from "react-native-chart-kit";

function WeightGraph() {
  const { user } = useAuthContext();
  const [details, setDetails] = useState([]);

  const [id, setId] = useState();

  //   useEffect(() => {
  //     if (user && user._id) {
  //       setId(user._id);
  //       getWeights(user._id);
  //     }
  //   }, []);

  //   const getWeights = () => {
  //     axios
  //       .get(`${baseUrl}/patients/${user._id}`)
  //       .then((response) => {
  //         setDetails(response.data);
  //         console.log("Weight Details: ", response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Axios Error: ", error);
  //       });
  //   };

  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.header}>Patient Weight History</Text>
  //     </View>
  //   );

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
        // Include current weight if it's not already in pastWeights
        // if (response.data.weight) {
        //   weights.push({ weight: response.data.weight, date: new Date() });
        // }
        setDetails(weights);
        console.log("Weight Details: ", weights);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };

  // Ensure details is always an array
  const safeDetails = Array.isArray(details) ? details : [];

  // Extract dates and weights for the graph
  const dates = safeDetails.map((entry) =>
    new Date(entry.date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    })
  );
  const weights = safeDetails.map((entry) => entry.weight);

  return (
    <View style={styles.container}>
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
          width={Dimensions.get("window").width - 16} // from react-native
          height={240}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0, // optional, defaults to 2dp
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
        <Text style={styles.overlayText}>Weight (kg)</Text>
      </View>
      <View style={styles.overlayDate}>
        <Text style={styles.overlayTextDate}>Month/Day</Text>
      </View>
    </View>
  );
}
export default WeightGraph;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    top: 220, // Adjust as needed
    left: 150, // Adjust as needed
    paddingBottom: 10,
  },
});
