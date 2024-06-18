import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../Services/AuthService";

import Header from "../../components/Header";
import { baseUrl } from "../../constants/constants";

const NewMedicalRecordScreen = () => {
  const navigation = useNavigation();

  function handleAddNew() {
    const postMedicalIncident = (
      recordName,
      recordDescription,
      date,
      patientID
    ) => {
      api
        .post(`${baseUrl}/medicalRecord/create`, {
          recordName: recordName,
          recordDescription: recordDescription,
          date: date,
          patientID: patientID,
        })
        .then((response) => {
          console.log("Success:", response.data);

          // Navigate or perform other actions as needed
          navigation.navigate("DisplayMedicalRecords", {
            recordName,
            recordDescription,
            date: date,
            patientID: patientID,
          });
        })
        .catch((error) => {
          console.error("Error posting medical incident:", error);
        });
    };
    // Call the postMedicalIncident function with the provided arguments
    postMedicalIncident(recordName, recordDescription, date, patientID);
  }

  const [recordName, setRecordName] = useState("");
  const [recordDescription, setRecordDescription] = useState("");
  const [date, setDate] = useState("");
  const [patientID, setPatientID] = useState("");

  console.log(recordName);
  console.log(recordDescription);

  return (
    <SafeAreaView>
      <Header name="Medical Record" />

      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.inputcontainer}>
            <Text style={styles.text1}>Record Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Record Name Here"
              onChangeText={(text) => setRecordName(text)}
            />
          </View>
          <View style={styles.inputcontainer}>
            <Text style={styles.text1}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Description Here"
              onChangeText={(text) => setRecordDescription(text)}
            />
          </View>
          <View style={styles.inputcontainer}>
            <Text style={styles.text1}>Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Description Here"
              onChangeText={(text) => setDate(text)}
            />
          </View>
          <View style={styles.inputcontainer}>
            <Text style={styles.text1}>Patient Id</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Description Here"
              onChangeText={(text) => setPatientID(text)}
            />
          </View>
        </View>
        <View style={styles.btn}>
          <Pressable onPress={handleAddNew}>
            <Text style={styles.btntext}>Save</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default NewMedicalRecordScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "72%",
    backgroundColor: "#FFFF",
  },
  btn: {
    backgroundColor: "#00567D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    maxWidth: "100%",
    padding: 2,
  },
  btntext: {
    color: "#FFF",
    padding: 8,
    fontSize: 16,
  },

  background: {
    backgroundColor: "#DEFFFB",
    width: "100%",
    height: "100%",
    padding: 15,
  },
  text1: {
    marginLeft: 28,
    fontWeight: "500",
    fontSize: 16,
    color: "#1e1e1e",
  },
  inputcontainer: {
    // flex: 0.4,
    paddingTop: "6%",
    justifyContent: "center",
  },
  text1: {
    marginLeft: 28,
    fontWeight: "500",
    fontSize: 16,
    color: "#1e1e1e",
    // fontFamily: 'poppins regular,',
  },
  input: {
    borderColor: "#8e8e8e",
    borderWidth: 1,
    padding: 10,
    width: "88%",
    height: 38,
    margin: 20,
    marginLeft: 25,
    // marginTop: 10,
    borderRadius: 10,
    fontSize: 16,
  },
});