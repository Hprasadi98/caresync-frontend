import { StyleSheet, Text, View, FlatList ,ActivityIndicator} from "react-native";
import Header from "../MedicalTestHomeScreen/components/Header";
import { useState, useEffect } from "react";
import { baseUrl } from "../../constants/constants";

const ViewMedication = ({ route }) => {
  const [medidetail, setmedidetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const { selectedday } = route.params;
  const day = new Date(selectedday.dateString);
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(day);
  const year = day.getFullYear();
  const dayOfWeekFull = day.toLocaleDateString("en-US", { weekday: "long" });
  const dayOfWeek = dayOfWeekFull.split(" ")[0];

  useEffect(() => {
    getmedicationforDay(selectedday.dateString);
  }, [selectedday.dateString]);

  const getmedicationforDay = (day) => {
    setLoading(true);
    console.log(day);
    const URL = `${baseUrl}/medication/${day}`;
    fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setmedidetail(data.response);
        //console.log("Medi data",data.response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!loading && medidetail.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Medications for {dayOfWeekFull}</Text>
      </View>
    );
  }

  return (
    <View>
      <Header name="View Medication" />

      <View style={styles.dateContainer}>
        <Text style={styles.dateWeekDay}>{dayOfWeek}</Text>
        <Text style={styles.dateWeekDay}>{selectedday.day}</Text>
        <Text style={styles.dateWeekDay}>{month}</Text>
        <Text style={styles.dateWeekDay}>{year}</Text>
      </View>

      {Array.isArray(medidetail) && (
        <FlatList
          data={medidetail}
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              <Text style={styles.medicineNametext}>{item.medicine}</Text>
              <View style={styles.detailContainer}>
                <Text style={styles.pilltext}>{item.pills} pill/s</Text>
                <Text style={styles.timestext}>
                  {item.times} time/s per day
                </Text>
                <Text style={styles.bawtext}>{item.baw} meal</Text>
              </View>
              {item.description !== null && item.description !== "" && (
                <Text style={styles.descriptiontext}>{item.description}</Text>
              )}
              <Text style={styles.bytext}>By {item.by}</Text>
            </View>
          )}
        ></FlatList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  dateWeekDay: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
    color: "gray",
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
  medicineNametext: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
  },
  pilltext: {
    paddingRight: 30,
  },
  timestext: {
    paddingRight: 30,
  },
  descriptiontext: {
    paddingLeft: 10,
    padding: 5,
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    elevation: 10,
    marginTop: 10,
  },
  bytext: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
  },
});
export default ViewMedication;
