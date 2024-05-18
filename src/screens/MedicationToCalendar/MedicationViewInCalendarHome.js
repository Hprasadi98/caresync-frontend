import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Header from "../MedicalTestHomeScreen/components/Header";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { baseUrl } from "../../constants/constants";
import { useEffect, useState } from "react";
import api from "../../Services/AuthService";

//navigate to medication adding form
const MedicationView = ({ navigation, route }) => {
  const { refresh } = route.params ? route.params : { refresh: false };

  useEffect(() => {
    getmedication();
    if (refresh) {
      getmedication();
    }
  }, [refresh]);

  const [medidetail, setmedidetail] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(true);

  //API integration for get results
  const getmedication = () => {
    setLoading(true);
    const URL = `${baseUrl}/medication`;
    fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setmedidetail(data);
        console.log(data);
        markDates(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
        setLoading(false);
      });
  };

  const markDates = (data) => {
    const markedDatesObj = {};
    const currentDate = new Date(); // Get current date
    const todayDateString = currentDate.toISOString().split("T")[0];
    data.forEach((item) => {
      if (Array.isArray(item.dayArray)) {
        item.dayArray.forEach((date) => {
          if (date < todayDateString) {
            // Check if the date is before today
            markedDatesObj[date] = { selected: true, selectedColor: "#FF0000" }; // Mark it in red
          } else {
            markedDatesObj[date] = { selected: true, selectedColor: "#00567D" }; // Mark it in blue
          }
        });
      }
    });
    setMarkedDates(markedDatesObj);
  };

  const deleteOneResult = (id) => {
    console.log(id);
    api
      .delete(`${baseUrl}/medication/${id}`)
      .then(() => {
        getmedication();
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  const addMedication = () => {
    navigation.navigate("AddMedication", { refreshMedicationView: true });
  };

  const updateMedication = (id) => {
    const selectedItem = medidetail.find((item) => item._id === id);
    navigation.navigate("AddMedication", {
      refreshMedicationView: true,
      selectedItem,
    });
  };

  //navigate to medication view
  const viewMedication = (day) => {
    navigation.navigate("ViewMedication", { selectedday: day });
  };

  return (
    <View style={{ backgroundColor: "#D9F8FF", flex: 1 }}>
      <Header name="Medication" />
      <Calendar
        style={{
          borderRadius: 10,
          marginRight: 10,
          marginLeft: 10,
          marginTop: 10,
          elevation: 4,
        }}
        onDayPress={(day) => {
          viewMedication(day);
          console.log(day);
        }}
        markedDates={markedDates}
      />
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : medidetail.length === 0 ? (
        <View style={styles.centered}>
          <Text>No medications</Text>
        </View>
      ) : (
        <FlatList
          data={medidetail}
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              <View style={styles.dateContainer}>
                <Text style={styles.datetext}>{item.date}</Text>
              </View>
              <Text style={styles.medicineNametext}>{item.medicine}</Text>
              <Text style={styles.daystext}>For {item.days} Day/s</Text>
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
              <View style={styles.listbottom}>
                <View style={styles.byContainer}>
                  <Text style={styles.bytext}>By {item.by}</Text>
                </View>
                <View style={styles.editdeleteContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log(item._id);
                      updateMedication(item._id);
                    }}
                  >
                    <Text style={styles.edittext}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      deleteOneResult(item._id);
                    }}
                  >
                    <Text style={styles.deletetext}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )
      }
      <TouchableOpacity
        style={styles.roundedPlusButton}
        onPress={() => {
          addMedication();
        }}
      >
        <Ionicons name="add-circle" size={60} color="#00567D" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  roundedPlusButton: {
    position: "absolute",
    bottom: 10,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    width: "90%",
    marginBottom: 5,
    backgroundColor: "#87CEEB",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 28,
    padding: 10,
    elevation: 4,
  },
  dateContainer: {
    backgroundColor: "#00567D",
    padding: 7,
    width: "40%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: -25,
  },
  datetext: {
    color: "white",
    fontSize: 16,
  },
  medicineNametext: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },
  daystext: {
    marginTop: -25,
    marginLeft: 200,
    fontWeight: "bold",
    color: "gray",
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
  listbottom: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  bytext: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
  },
  editdeleteContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "right",
    alignSelf: "right",
    paddingLeft: 120,
    marginTop: 10,
  },
  edittext: {
    paddingLeft: 10,
    paddingRight: 10,
    padding: 5,
    backgroundColor: "black",
    color: "white",
    alignSelf: "center",
    alignContent: "center",
    borderRadius: 10,
  },
  deletetext: {
    paddingLeft: 10,
    paddingRight: 10,
    padding: 5,
    backgroundColor: "red",
    color: "white",
    alignSelf: "center",
    alignContent: "center",
    borderRadius: 10,
    marginLeft: 10,
  },
});

export default MedicationView;
