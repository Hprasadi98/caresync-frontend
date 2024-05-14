import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Header from "../MedicalTestHomeScreen/components/Header";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { baseUrl } from "../../constants/constants";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

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

  //API integration for get results
  const getmedication = () => {
    const URL = `${baseUrl}/medication`;
    fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setmedidetail(data);
        //console.log(data);
      });
  };

  const deleteOneResult = (id) => {
    console.log(id);
    axios
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
      />

      <FlatList
        data={medidetail}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Text>By : {item.by}</Text>
            <Text>Name of the medicine : {item.medicine}</Text>
            <Text>Date : {item.date}</Text>
            <Text>No of Pills : {item.pills}</Text>
            <Text>No of days : {item.days}</Text>
            <Text>No of times per day : {item.times}</Text>
            <Text>{item.baw} meal</Text>
            <Text>Description : {item.description}</Text>
            <View style={styles.iconcontainer}>
              <TouchableOpacity onPress={() => {}}>
                <MaterialIcons
                  name="mode-edit"
                  size={24}
                  color="black"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {deleteOneResult(item._id)}}>
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={24}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      ></FlatList>

      <TouchableOpacity
        style={styles.roundedPlusButton}
        onPress={() => {
          addMedication();
        }}
      >
        <Ionicons name="add-circle" size={60} color="#00567D" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 10,
    backgroundColor: "#87CEEB",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
    padding: 10,
  },
  iconcontainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "right",
    alignSelf: "center",
  },
});

export default MedicationView;
