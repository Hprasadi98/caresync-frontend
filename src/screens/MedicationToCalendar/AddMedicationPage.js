import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import Header from "../MedicalTestHomeScreen/components/Header";
import { TextInput, RadioButton } from "react-native-paper";
import {
  EvilIcons,
  Ionicons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useState,useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../constants/constants";

const AddMedication = ({navigation}) => {
  const [medicineName, setMedicineName] = useState();
  const [dateInput, setDateInput] = useState();
  const [pillAmount, setPillAmount] = useState();
  const [noofdays, setnoofDays] = useState();
  const [choosePeriod, setchoosePeriod] = useState(1);
  const [description, setdescription] = useState();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [checked, setChecked] = useState("before");
  const padtoTwo = (number) => (number <= 9 ? `0${number}` : number);
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  let sDate = `${year}-${padtoTwo(month)}-${padtoTwo(date)}`;

  const refreshMedicationView = () => {
    navigation.navigate("MedicationView", { refresh: true });
  };

  const by = "patient";

  const addmedication = () => {
    const payload = {
      by:by,
      medicine:medicineName,
      date:dateInput,
      pills:pillAmount,
      days:noofdays,
      times:choosePeriod,
      baw:checked,
      description:description,
    };
    //console.log(payload);
    axios
      .post(`${baseUrl}/medication`, payload)
      .then(() => {
        console.log("add");
        //getmedication();
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  //show alert when press the add medication button
  const AlertBox = () => {
    Alert.alert(
      "Successful message",
      "Add medication to the calendar successfully.",
      [
        {
          text: "ok",
          onPress: () => {
            addmedication();
            refreshMedicationView();
          },
        },
      ]
    );
  };
  //function with modal visibility changing, parameter value boolean
  const changeModalVisibility = (bool) => {
    setisModalVisible(bool);
  };

  const OPTIONS = [1, 2, 3, 4]; //period options
  const WIDTH = Dimensions.get("window").width;
  const HEIGHT = Dimensions.get("window").height;

  const onPressItem = (option) => {
    changeModalVisibility(false);
    setchoosePeriod(option);
  };

  //map time options with the modal items
  const option = OPTIONS.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item)}
      >
        <Text style={styles.textItem}>{item}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <Header name="Add Medication" />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.topics}>Name of Medicine</Text>
          <View style={styles.nameContainer}>
            <TextInput
              placeholder="Name of Medicine"
              style={styles.textName}
              onChangeText={setMedicineName}
            />
            <TouchableOpacity onPress={() => {}}>
              <EvilIcons name="search" size={26} color="gray" />
            </TouchableOpacity>
          </View>

          <Text style={styles.topics}>Starting Date</Text>
          <Text style={styles.subtopics}>When do you start medication?</Text>
          <View style={styles.nameContainer}>
            <TextInput
              placeholder="yyyy-mm-dd"
              onChangeText={setDateInput}
              style={styles.textName}
            />
            <TouchableOpacity onPress={() => {}}>
              <EvilIcons name="calendar" size={28} color="gray" />
            </TouchableOpacity>
          </View>

          <Text style={styles.topics}>Dosage & Duration</Text>
          <Text style={styles.subtopics}>
            How many pills need to take at once? & How long?
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={styles.nameContainer2}>
              <TextInput
                placeholder="pills"
                onChangeText={setPillAmount}
                keyboardType="numeric"
                style={styles.textName2}
              />
              <TouchableOpacity onPress={() => {}}>
                <AntDesign name="down" size={16} color="gray" />
              </TouchableOpacity>
            </View>
            <View style={styles.nameContainer2}>
              <TextInput
                placeholder="days"
                onChangeText={setnoofDays}
                keyboardType="numeric"
                style={styles.textName2}
              />
              <TouchableOpacity onPress={() => {}}>
                <AntDesign name="down" size={16} color="gray" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.topics}>Time</Text>
          <Text style={styles.subtopics}>
            Add times per day when you need to take pills
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => changeModalVisibility(true)}
              style={styles.nameContainer3}
            >
              <Text style={styles.textName3}>{choosePeriod}</Text>
            </TouchableOpacity>

            <Modal
              transparent={true}
              animationType="fade"
              visible={isModalVisible}
              nRequestClose={() => changeModalVisibility(false)}
            >
              <TouchableOpacity
                onPress={() => changeModalVisibility(false)}
                style={styles.modalContainer2}
              >
                <View
                  style={[
                    styles.modal,
                    { width: WIDTH - 230, height: HEIGHT - 570 },
                  ]}
                >
                  {option}
                </View>
              </TouchableOpacity>
            </Modal>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          ></View>

          <Text style={styles.topics}>Food & Pill</Text>
          <Text style={styles.subtopics}>
            What's the time you need to take pill?
          </Text>
          <View style={styles.radioButtons}>
            <RadioButton
              value="before"
              status={checked === "before" ? "checked" : "unchecked"}
              onPress={() => setChecked("before")}
            />
            <Text style={styles.radioText}>Before</Text>
            <RadioButton
              value="after"
              status={checked === "after" ? "checked" : "unchecked"}
              onPress={() => setChecked("after")}
            />
            <Text style={styles.radioText}>After</Text>
            <RadioButton
              value="with"
              status={checked === "with" ? "checked" : "unchecked"}
              onPress={() => setChecked("with")}
            />
            <Text style={styles.radioText}>With Food</Text>
          </View>

          <Text style={styles.topics}>Add notes</Text>
          <TextInput
            multiline
            numberOfLines={3}
            maxLength={50}
            placeholder="Description"
            onChangeText={setdescription}
            style={{ padding: 5, backgroundColor: "white", marginTop: 5 }}
          />
          <View style={{ alignItems: "center", padding: 10 }}>
            <TouchableOpacity style={styles.button} onPress={AlertBox}>
              <Text style={styles.buttontext}>Add Medication</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: "80%",
    padding: 15,
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
  },
  topics: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtopics: {
    fontSize: 14,
    color: "gray",
  },
  nameContainer: {
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textName: {
    backgroundColor: "white",
    height: 40,
    width: "82%",
    marginLeft: 10,
    marginRight: 10,
  },
  nameContainer2: {
    marginTop: 5,
    marginBottom: 5,
    width: "45%",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
  textName2: {
    backgroundColor: "white",
    height: 40,
    width: "65%",
    marginLeft: 10,
    marginRight: 10,
  },
  nameContainer3: {
    marginTop: 5,
    marginBottom: 5,
    width: "38%",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    justifyContent: "center",
  },
  textName3: {
    backgroundColor: "white",
    height: 30,
    marginTop: 10,
    fontSize: 16,
  },
  nameContainer4: {
    marginTop: 5,
    marginBottom: 5,
    width: "45%",
    backgroundColor: "gray",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  textName4: {
    color: "white",
    backgroundColor: "gray",
    height: 40,
    width: "70%",
    marginLeft: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 10,
    width: 150,
    alignItems: "center",
  },
  buttontext: {
    fontSize: 14,
    fontWeight: "bold",
  },
  radioButtons: {
    display: "flex",
    flexDirection: "row",
  },
  radioText: {
    marginTop: 8,
    fontSize: 13,
    marginRight: 18,
  },
  modalContainer: {
    flex: 1,
    marginLeft: 20,
    marginTop: 250,
  },
  modal: {
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginBottom: 100,
  },
  modalContainer2: {
    flex: 1,
    marginLeft: 100,
    marginTop: 330,
  },
  option: {
    alignItems: "flex-start",
  },
  textItem: {
    margin: 10,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default AddMedication;
