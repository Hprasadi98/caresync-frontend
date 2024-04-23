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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Calendar } from "react-native-calendars";

const DetailRow = ({ name, textLineOne, textLineTwo, category }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fullName, setFullName] = useState("John Doe");
  const [newFullName, setNewFullName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGender, setSelectedGender] = useState(textLineTwo);
  const [selectedOne, setSelectedOne] = useState(parseFloat(textLineTwo));

  const handleUpdateProfile = () => {
    // Update profile with new full name
    console.log("New full name: ", inputValue);

    setNewFullName(inputValue);
    setModalVisible(false);
  };

  const increment = () => {
    setSelectedOne(selectedOne + 1);
  };

  const decrement = () => {
    if (selectedOne > 0) {
      setSelectedOne(selectedOne - 1);
    }
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
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
              placeholder="Enter new full name"
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
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
              placeholder="Enter new email address"
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
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
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
            <Calendar
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: "blue" },
              }}
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
      case "weight":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Select Weight</Text>
            <View style={styles.weightControl}>
              <TouchableOpacity style={styles.arrowButton} onPress={increment}>
                <Icon name="caret-up" size={20} color="black" />
              </TouchableOpacity>
              <Text style={styles.selectedWeight}>{selectedOne} kg</Text>
              <TouchableOpacity style={styles.arrowButton} onPress={decrement}>
                <Icon name="caret-down" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );

      case "height":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Select height</Text>
            <View style={styles.heightControl}>
              <TouchableOpacity style={styles.arrowButton} onPress={increment}>
                <Icon name="caret-up" size={20} color="black" />
              </TouchableOpacity>
              <Text style={styles.selectedheight}>{selectedOne} cm</Text>
              <TouchableOpacity style={styles.arrowButton} onPress={decrement}>
                <Icon name="caret-down" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );
      case "blood":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit Blood Group</Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
              placeholder="Enter blood group"
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
    marginTop: 8,
    flexDirection: "row",
    width: 30,
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
});
