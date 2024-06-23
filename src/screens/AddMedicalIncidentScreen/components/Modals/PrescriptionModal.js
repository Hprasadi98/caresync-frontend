import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import { baseUrl } from "../../../../constants/constants";
import api from "../../../../Services/AuthService";

const PrescriptionModal = ({
  recordID,
  onClose,

}) => {
  const navigation = useNavigation(); // Get navigation object
  const [presLink, setPresLink] = useState("");
  const [doctorID, setDoctorID] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [prescriptionDate, setPrescriptionDate] = useState("");
  const [prescriptionNote, setPrescriptionNote] = useState("");

  const savePrescriptionIncident = () => {
    api
      .post(`${baseUrl}/medicalIncident/PrescriptionIn/create`, {
        type: "symptom",
        recordID: recordID,
        doctorID: doctorID,
        doctorName: doctorName,
        PrescriptionDate: prescriptionDate,
        description: prescriptionNote,
        link: presLink
      }
      )
      .then((response) => {
        console.log("Success:", response.data);
        Alert.alert("Success", "Prescription Added Successfully");

        // Navigate or perform other actions as needed
        navigation.navigate("DisplayMedicalRecords");
      })
      .catch((error) => {
        console.error("Error saving incident:", error);
      });
  };


  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Add Prescription Details</Text>
      <View style={styles.contentContainer}>
        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Doctor ID:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the Doctor ID"
            onChangeText={(text) => setDoctorID(text)}
          />
        </View>

        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Doctor Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Doctor's Name"
            onChangeText={(text) => setDoctorName(text)}
          />
        </View>

        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Prescription Date:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter prescripton date"
            onChangeText={(text) => setPrescriptionDate(text)}
          />
        </View>

        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            placeholder="max 30 characters"
            onChangeText={(text) => setPrescriptionNote(text)}
          />
        </View>
        <Text style={styles.label}>Upload the link</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Enter your prescription link"
            value={presLink}
            onChangeText={setPresLink}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Close" onPress={onClose} color="#00567D" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="OK" onPress={savePrescriptionIncident} color="#00567D" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%",
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
  modalText: {
    fontSize: 22,
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

    height: 38,
    marginBottom: 40,
    marginLeft: 25,
    marginTop: 10,
    borderRadius: 10,
    fontSize: 16,
  },
});

export default PrescriptionModal;
