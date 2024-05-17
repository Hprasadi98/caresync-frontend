import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Slider,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import api from "../../../Services/AuthService";
import { baseUrl } from "../../../constants/constants";

import { Picker } from "@react-native-picker/picker";
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DetailRowDoctor = ({
  name,
  textLineOne,
  textLineTwo,
  category,
  refreshUserData,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [fullname, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [nic, setNic] = useState("");
  const [specialization, setSpecialization] = useState("");


  const [selectedGender, setSelectedGender] = useState("");





  const _id = "6627c4c328a6a54a64fb544a";
  // console.log(booodGroup);

  const handleUpdateProfile = () => {
    // Prepare the updated data based on the category
   
    let updatedData = {};
    switch (category) {
      case "fullName":
        if (first.trim() === "" || second.trim() === "") {
          // Handle empty inputs, show error message, etc.
        } else {
          console.log("Updating profile with:", first, second);
          // Combine first and last names into one object
          updatedData = {
            firstName: first,
            lastName: second,
          };
          break;
        }

      case "email":
        if (email.trim() === "") {
          
        } else {
          updatedData = { email: email }; 
          break;
        }
      case "nic":
        if (nic.trim() === "") {
          
        } else {
          updatedData = { nic: nic }; 
          break;
        }
      case "mobile":
        if (phone.trim() === "") {
        
        } else {
          updatedData = { mobileNumber: phone }; 
          break;
        }

        case "specialization":
          if (specialization.trim() === "") {
            
          } else {
            updatedData = { specialization: specialization }; 
            break;
          }
      case "gender":
        if (selectedGender.trim() === "") {
      
        } else {
          updatedData = { gender: selectedGender }; 
          break;
        }

      default:
        break;
    }

    // Make an HTTP PUT request to update the doctor's information
    api
      .put(`${baseUrl}/doctors/${_id}`, updatedData) 
      .then((response) => {
        console.log(
          "Doctor information updated successfully: ",
          response.data
        );
        refreshUserData();
      })
      .catch((error) => {
        console.error("Failed to update doctor information: ", error);
        // Optionally, you can handle error cases
      });

    // Close the modal
    setModalVisible(false);
  };

  // Define modal content based on category
  const renderModalContent = () => {
    switch (category) {
      case "fullName":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit Full Name</Text>
            <TextInput
              style={styles.input}
              value={first}
              onChangeText={(text) => setFirst(text)}
              placeholder="Enter first name"
            />
            <TextInput
              style={styles.input}
              value={second}
              onChangeText={(text) => setSecond(text)}
              placeholder="Enter last name"
            />
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );
      case "email":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter new email address"
            />
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );
      case "nic":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit NIC Number</Text>
            <TextInput
              style={styles.input}
              value={nic}
              onChangeText={(text) => setNic(text)}
              placeholder="Enter NIC Number"
            />
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );
      case "mobile":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit Mobile Number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Enter new mobile number"
            />
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );
      // Add more cases for other categories as needed

      case "specialization":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit Specialization </Text>
            <TextInput
              style={styles.input}
              value={specialization}
              onChangeText={(text) => setSpecialization(text)}
              placeholder="Enter Specialization"
            />
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );
      case "gender":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Select Gender</Text>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setSelectedGender("Male")}
            >
              <Icon
                name={selectedGender === "Male" ? "dot-circle" : "circle"}
                size={20}
                color="black"
              />
              <Text style={styles.radioButtonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setSelectedGender("Female")}
            >
              <Icon
                name={selectedGender === "Female" ? "dot-circle" : "circle"}
                size={20}
                color="black"
              />
              <Text style={styles.radioButtonText}>Female</Text>
            </TouchableOpacity>
            <Button
              style={styles.Button}
              title="Save"
              onPress={handleUpdateProfile}
            />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={name} size={30} color="black" />
      </View>

      <View style={styles.textcontainer}>
        <Text style={styles.textLineOne}>{textLineOne}</Text>
        <Text style={styles.textLineTwo}>{textLineTwo}</Text>
        <View style={styles.horizontalLine} />
      </View>
      <TouchableOpacity
        style={styles.arrowRight}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="chevron-right" size={15} color="black" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>{renderModalContent()}</View>
      </Modal>
    </View>
  );
};

export default DetailRowDoctor;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    marginLeft: 30,
  },
  textcontainer: {
    flexDirection: "column",

    marginLeft: 40,
  },
  iconContainer: {
    marginTop: -10,
    flexDirection: "row",
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textLineOne: {
    fontSize: 16,
    color: "grey",
  },
  textLineTwo: {
    fontSize: 16,
    color: "black",
  },
  horizontalLine: {
    borderBottomWidth: 1, // Change the width as needed
    borderBottomColor: "#ccc", // Change the color as needed
    marginVertical: 15, // Adjust vertical spacing as needed
    width: 230,
  },
  arrowRight: {
    marginTop: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "60%", // Limit the height of the modal content
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 10,
  },
  sliderContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  weightControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  heightControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedWeight: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  selectedheight: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  arrowButton: {
    padding: 10,
  },
  Button: {
    marginTop: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    color: "black",
  },
  years: {
    color: "black",
  },
  pickeritem: {
    color: "black",
    width: 150,
  },
});
