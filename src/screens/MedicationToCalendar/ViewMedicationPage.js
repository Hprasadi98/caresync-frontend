import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import Header from "../MedicalTestHomeScreen/components/Header";
import { useState, useEffect } from "react";
import { baseUrl } from "../../constants/constants";

const ViewMedication = ({ route }) => {
  const [medidetail, setmedidetail] = useState([]);

  const { selectedday } = route.params;
  const day = new Date(selectedday.dateString);
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(day);

  useEffect(() => {
    getmedicationforDay(selectedday.dateString);
  }, [selectedday.dateString]);

  const getmedicationforDay = (day) => {
    console.log(day);
    const URL = `${baseUrl}/medication/${day}`;
    fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setmedidetail(data.response);
        console.log("Medi data",data.response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <View>
      <Header name="View Medication" />

      <View style={styles.dateContainer}>
        <View style={styles.dateCircle}>
          <Text style={styles.dateDay}>{selectedday.day}</Text>
          <Text style={styles.dateWeekDay}>{month}</Text>
        </View>
      </View>

      {Array.isArray(medidetail) && (
        <FlatList
          data={medidetail}
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              <Text>By : {item.by}</Text>
              <Text>Name of the medicine : {item.medicine}</Text>
              <Text>Starting Date : {item.date}</Text>
              <Text>No of Pills : {item.pills}</Text>
              <Text>No of times per day : {item.times}</Text>
              <Text>{item.baw} meal</Text>
              <Text>Description : {item.description}</Text>
            </View>
          )}
        ></FlatList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  dateCircle: {
    marginTop: 10,
    height: 60,
    width: 60,
    backgroundColor: "#3498db",
    borderRadius: 10,
    elevation: 4,
    alignItems: "center",
    marginBottom: 10,
  },
  dateDay: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 5,
    color: "white",
  },
  dateWeekDay: {
    color: "white",
    fontSize: 15,
    margin: -5,
  },
  detailsContainer: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#D9F8FF",
    elevation: 4,
    borderRadius: 10,
    marginBottom: 10,
  },
  docNameContainer: {
    backgroundColor: "gray",
    borderRadius: 10,
  },
  docName: {
    color: "white",
    padding: 10,
  },
  listContainer: {
    width: "90%",
    marginBottom: 10,
    backgroundColor: "#87CEEB",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
    padding: 10,
  },
});
export default ViewMedication;
