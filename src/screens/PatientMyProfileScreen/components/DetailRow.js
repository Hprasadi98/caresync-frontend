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
import Dropdown from "./Dropdown";
import BirthdayCalendar from "./BirthdayCalendar";
import { Picker } from "@react-native-picker/picker";
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
import { useAuthContext } from "../../../hooks/useAuthContext";

const DetailRow = ({
  name,
  textLineOne,
  textLineTwo,
  category,
  refreshUserData,
}) => {
  const { user } = useAuthContext();
  const id = user._id;

  const [modalVisible, setModalVisible] = useState(false);

  const [fullname, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [address, setAddress] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [bloodGroup, setBloodGroup] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [nic, setNic] = useState("")


  const checkEmailExists = async (email) => {
    try {
      const response = await api.get(`${baseUrl}/${email}`);
      return response.data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  };



  // Function to generate years array (adjust as needed)
  const generateYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i.toString());
    }

    return years;
  };

 
  const generateDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, index) =>
      (index + 1).toString()
    );
    return days;
  };

  const handleBloodGroupSelect = (selectedGroup) => {
    setBloodGroup(selectedGroup);
  };



  const handleUpdateProfile = async () => {
    console.log(selectedYear, selectedMonth, selectedDay);
     // Check if the email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const weightRegex = /^[0-9]{1,3}$/;
  const heightRegex = /^[0-9]{1,3}$/;

 

  try {
    // Check if the email already exists in the database
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      Alert.alert('Error', 'This email is already in use. Please choose another one.');
      return;
    }
  }
catch (error) {
  console.error('Failed to update patient information:', error);
  // Optionally, you can handle error cases
  Alert.alert('Error', 'Failed to update patient information. Please try again later.');
}


    // Prepare the updated data based on the category
    console.log(
      "Selected date:",
      `${selectedYear}-${selectedMonth}-${selectedDay}`
    );
    let updatedData = {};
    switch (category) {
      case "fullName":
        if (first.trim() === "" || second.trim() === "") {
          Alert.alert('Error', 'Please enter a valid name');
          return;
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
          // Alert.alert("Error", "Please enter a name");
        }
        if (!emailRegex.test(email)) {
          Alert.alert('Error', 'Please enter a valid email address');
          return;
        }
        
        else {
          updatedData = { email: email }; 
          break;
        }
        case "nic":
          if (nic.trim() === "") {
            Alert.alert('Error', 'Please enter a valid NIC');
          return;
            
          } else {
            updatedData = { nic: nic }; 
            break;
          }
      case "address":
        if (address.trim() === "") {
          // Alert.alert("Error", "Please enter a name");
        } else {
          updatedData = { address: address }; 
          break;
        }
      case "mobile":
        if (mobileNumber.trim() === "") {
          // Alert.alert("Error", "Please enter a name");
        }
        if (!phoneRegex.test(mobileNumber)) {
          Alert.alert('Error', 'Please enter a valid 10-digit phone number');
          return;
        } 
        else {
          updatedData = { mobileNumber: mobileNumber }; 
          break;
        }

      case "birthday":
        const selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
        if (selectedDate.trim() === "") {
          // Alert.alert("Error", "Please enter a name");
        } else {
          updatedData = { birthday: selectedDate };
          break;
        }
      case "gender":
        if (selectedGender.trim() === "") {
          // Alert.alert("Error", "Please enter a name");
        } else {
          updatedData = { gender: selectedGender }; 
          break;
        }
      case "weight":
        if (weight.trim() === "") {
          // Alert.alert("Error", "Please enter a name");
        } 
        if (!weightRegex.test(weight)) {
          Alert.alert('Error', 'Please enter a valid weight');
          return;
        }else {
          updatedData = {  weight: weight };
          break;
        }
        

      case "height":
        if (height.trim() === "") {
          // Alert.alert("Error", "Please enter a name");
        }  if (!heightRegex.test(height)) {
          Alert.alert('Error', 'Please enter a valid height');
          return;
        }else {
          updatedData = { height: height }; 
          break;
        }
      
      case "blood":
        if (bloodGroup.trim() === "") {
          // Alert.alert("Error", "Please enter a name");
        } else {
          updatedData = { blood: bloodGroup };
          break;
        }
      default:
        break;
    }

    // Make an HTTP PUT request to update the patient's information
    api
      .put(`${baseUrl}/patients/${id}`, updatedData)
      .then((response) => {
        console.log(
          "Patient information updated successfully: ",
          response.data
        );
        refreshUserData();


      })
      .catch((error) => {
        console.error("Failed to update patient information: ", error);
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
      case "address":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={(text) => setAddress(text)}
              placeholder="Enter address"
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
              value={mobileNumber}
              onChangeText={(text) => setmobileNumber(text)}
              placeholder="Enter new mobile number"
            />
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );
      // Add more cases for other categories as needed

      case "birthday":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Select Birthday</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={selectedYear}
                onValueChange={(itemValue) => setSelectedYear(itemValue)}
              >
                {generateYears().map((years) => (
                  <Picker.Item
                    style={styles.years}
                    key={years}
                    label={years}
                    value={years}
                    placeholder="Select Year"
                  />
                ))}

                <Text>{selectedYear}</Text>
              </Picker>

              <Picker
                style={styles.picker}
                selectedValue={selectedMonth}
                onValueChange={(itemValue) => setSelectedMonth(itemValue)}
              >
                <Picker.Item label="January" value="01" />
                <Picker.Item label="February" value="02" />
                <Picker.Item label="March" value="03" />
                <Picker.Item label="April" value="04" />
                <Picker.Item label="May" value="05" />
                <Picker.Item label="June" value="06" />
                <Picker.Item label="July" value="07" />
                <Picker.Item label="August" value="08" />
                <Picker.Item label="September" value="09" />
                <Picker.Item label="October" value="10" />
                <Picker.Item label="November" value="11" />
                <Picker.Item label="December" value="12" />
              </Picker>
              <Picker
                style={styles.picker}
                selectedValue={selectedDay}
                onValueChange={(itemValue) => setSelectedDay(itemValue)}
              >
                {generateDays().map((day) => (
                  <Picker.Item
                    key={day}
                    label={day}
                    value={day}
                    style={styles.pickeritem}
                  />
                ))}
              </Picker>
            </View>

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
      case "weight":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit Your Weight</Text>
          
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={(text) => setWeight(text)}
              placeholder="Enter your weight in kg"
            />
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );

      case "height":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit Your height</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={(text) => setHeight(text)}
              placeholder="Enter your height in cm"
            />
            
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );
      case "blood":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit Blood Group</Text>
            <Dropdown
              options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
              placeholderText="Select from the list"
              onSelect={handleBloodGroupSelect}
            />
            <Button title="Save" onPress={handleUpdateProfile} />
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

export default DetailRow;
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
    marginTop: 0,
    flexDirection: "row",
    width: 35,
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
