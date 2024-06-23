import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import { baseUrl } from "../../../../constants/constants";
import { useNavigation } from "@react-navigation/native";
import api from "../../../../Services/AuthService";

const AppointmentModal = ({
  recordID,
  onClose,

}) => {

  const [docID, setDocID] = useState("");
  const [healthProName, setHealthProName] = useState("");
  const [appDateTime, setAppDateTime] = useState("");
  const [appType, setAppType] = useState("");
  const [appointmentPurpose, setAppointmentPurpose] = useState("");

  const navigation = useNavigation(); // Get navigation object


  const saveAppointmentIncident = () => {
    api
      .post(`${baseUrl}/medicalIncident/AppointmentIn/create`, {
        type: "appointment",
        recordID: recordID,
        doctorID: docID,
        doctorName: healthProName,
        appointmentDateTime: appDateTime,
        appointmentType: appType,
        description: appointmentPurpose

      })
      .then((response) => {
        console.log("Success:", response.data);
        Alert.alert("Success", "Appointment Added Successfully");

        // Navigate or perform other actions as needed
        navigation.navigate("DisplayMedicalRecords");
      })
      .catch((error) => {
        console.error("Error saving incident:", error);
      });
  };


  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Add Appointment Details</Text>
      {/* <ScrollView style={styles.scrollview}> */}
      <View style={styles.contentContainer}>
        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            placeholder="Maximum 30 characters"
            onChangeText={(text) => setAppointmentPurpose(text)}
          />
        </View>

        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Doctor ID:</Text>
          <TextInput
            style={styles.input}
            placeholder="Type the Doctor ID"
            onChangeText={(text) => setDocID(text)}
          />
        </View>

        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Doctor's Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Type Doctor's name"
            onChangeText={(text) => setHealthProName(text)}
          />
        </View>

        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Appointment Date and Time: </Text>
          <TextInput
            style={styles.input}
            placeholder="Appointment Date"
            onChangeText={(text) => setAppDateTime(text)}
          />
        </View>

        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Appointment Type: </Text>
          <TextInput
            style={styles.input}
            placeholder="Type Healthcare provider's name"
            onChangeText={(text) => setAppType(text)}
          />
        </View>

      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Close" onPress={onClose} color="#00567D" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="OK"
            onPress={saveAppointmentIncident}
            color="#00567D"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "54%",
    position: "absolute",
    height: "75%",
    left: 0,
    right: 0,
    bottom: 10,
    marginLeft: "3%",
    alignContent: "center",
    justifyContent: "center",
    elevation: 4,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    width: "94%",
  },

  topic: {
    paddingTop: 30,
    fontSize: 18,
    paddingLeft: 15,
    fontWeight: "800",
  },
  modalText: {
    fontSize: 23,
    fontWeight: "900",
    top: 0,
    position: "absolute",
    padding: 10,
    color: "#013d59",
  },
  contentContainer: {
    width: "100%",
    top: 6,
    position: "absolute",
    paddingTop: "6%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: "92%",
    left: 30,
    // right: 15,
    top: 580,
  },
  buttonWrapper: {
    width: "40%", // Adjust as needed
  },
  label: {
    marginTop: 25,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: "8%",
  },
  inputcontainer: {
    marginVertical: "-16%",
    marginTop: 2,
  },

  input: {
    borderColor: "#8e8e8e",
    borderWidth: 1,
    padding: 10,
    width: "88%",
    height: 38,
    marginBottom: 40,
    marginLeft: 25,
    marginTop: 10,
    borderRadius: 10,
    fontSize: 16,
  },
});

export default AppointmentModal;
