import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import CustomDropdown from "../CustomDropdown";
import TestProviderDropDown from "../TestProviderDropDown";
import { baseUrl } from "../../../../constants/constants";
import api from "../../../../Services/AuthService";

const TestModal = ({
  selectedStartDate,
  selectedOption,
  onClose,
  recordID,
  recordName,
  description,
}) => {
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [testDate, setTestDate] = useState(null);
  const [result, setResult] = useState("");
  const [resultLink, setResultLink] = useState("");
  const navigation = useNavigation(); // Get navigation object

  const saveIncident = () => {
    api
      .post(`${baseUrl}/medicalIncident/testIn/create`, {
        type: "test",
        recordID: recordID,
        testType: selectedOption1,
        provider: selectedOption2,
        // description: description,
        testDate: testDate,
        result: result,
        resultLink: resultLink,
      })
      .then((response) => {
        console.log("Success:", response.data);

        // Navigate or perform other actions as needed
        navigation.navigate("DisplayMedicalRecords");
      })
      .catch((error) => {
        console.error("Error saving incident:", error);
      });
  };
  // Call the postMedicalIncident function with the provided arguments

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Add Test Details</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Test Type:</Text>
        <View style={styles.dropdowncontainer}>
          <CustomDropdown
            selectedOption1={selectedOption1}
            setSelectedOption1={setSelectedOption1}
            options={[
              "Spirometry",
              "Arterial Blood Gas (ABG) Test",
              "Bronchoscopy",
              "Chest X-ray",
              "CT Scan",
              "Peak Expiratory Flow (PEF) Test",
              "Other",
            ]}
            placeholderText="Select from the list"
          />
        </View>
        <Text style={styles.label}>Test Provider:</Text>
        <View style={styles.dropdowncontainer}>
          <TestProviderDropDown
            selectedOption2={selectedOption2}
            setSelectedOption2={setSelectedOption2}
            options={["HOSPITAL", "LAB", "CLINIC", "Other"]}
            placeholderText="Select from the list"
          />
        </View>
        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Test Date:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Test Date Here"
            onChangeText={(text) => setTestDate(text)}
          />
        </View>
        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Result:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Result Here"
            onChangeText={(text) => setResult(text)}
          />
        </View>
        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Result Link:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Result Link Here"
            value={resultLink}
            onChangeText={setResultLink}

          />
        </View>

      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Close" onPress={onClose} color="#00567D" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="OK" onPress={saveIncident} color="#00567D" />
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
    paddingTop: 40,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: "4%"

  },
  dropdowncontainer: {
    marginVertical: "-5%",
  },

  input: {
    borderColor: "#8e8e8e",
    borderWidth: 1,
    padding: 10,
    height: 38,
    marginVertical: "-5%",
    borderRadius: 10,
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10,
    width: "90%",

  },

});

export default TestModal;