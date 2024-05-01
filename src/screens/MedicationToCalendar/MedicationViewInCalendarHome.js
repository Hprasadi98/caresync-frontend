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
import { MaterialCommunityIcons } from '@expo/vector-icons';

//navigate to medication adding form
const MedicationView = ({ navigation }) => {
  useEffect(() => {
    getmedication();
  }, []);
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

  const addMedication = () => {
    navigation.navigate("AddMedication");
  };

  //navigate to medication view
  const viewMedication = () => {
    navigation.navigate("ViewMedication");
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
          viewMedication();
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
            <TouchableOpacity onPress={()=>{}}>
                <MaterialCommunityIcons name="delete-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      ></FlatList>

      <TouchableOpacity
        style={styles.roundedPlusButton}
        onPress={() => {
          addMedication();
        }}
      >
        <Ionicons name="add-circle" size={60} color="white" />
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
  listContainer:{
    width:"90%",
    marginBottom:10,
    backgroundColor:"gray",
    borderRadius:10,
    alignSelf:"center",
    marginTop:10,
    padding:10
  }
});

export default MedicationView;
