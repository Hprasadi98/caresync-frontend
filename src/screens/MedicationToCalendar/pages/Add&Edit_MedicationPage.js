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

import Header from "../../MedicalTestHomeScreen/components/Header";
import { TextInput, RadioButton } from "react-native-paper";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import api from "../../../Services/AuthService";
import { baseUrl } from "../../../constants/constants";
import { format, addDays, eachDayOfInterval } from "date-fns";
import DatePicker from "react-native-modern-datepicker";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { SelectList } from "react-native-dropdown-select-list";

const AddMedication = ({ navigation, route }) => {
  const [medicineName, setMedicineName] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [pillAmount, setPillAmount] = useState("");
  const [noofdays, setnoofDays] = useState("");
  const [choosePeriod, setchoosePeriod] = useState(1);
  const [description, setdescription] = useState("");
  const [checked, setChecked] = useState("before");
  const [frequency, setfrequency] = useState("day");
  const [mediType, setmediType] = useState("Tablet");
  const [unit, setunit] = useState("mg");
  const [duration, setDuration] = useState("day/s");

  const padtoTwo = (number) => (number <= 9 ? `0${number}` : number);
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  let sDate = `${year}-${padtoTwo(month)}-${padtoTwo(date)}`;

  const [isEdit, setisEdit] = useState(false);
  const { selectedItem } = route.params;
  const { user } = useAuthContext();
  // const today = new Date();
  // const startingDate = format(new Date(today), "yyyy-MM-dd");

  const frequencyList = [
    {
      key: "hour",
      value: "hour",
    },
    {
      key: "day",
      value: "day",
    },
    {
      key: "every other day",
      value: "every other day",
    },
    {
      key: "week",
      value: "week",
    },
    {
      key: "month",
      value: "month",
    },
  ];

  const mediTypeList = [
    {
      key: "Tablet",
      value: "Tablet",
    },
    {
      key: "Injection",
      value: "Injection",
    },
    {
      key: "Syrup",
      value: "Syrup",
    },
  ];

  const unitList = {
    Tablet: [
      {
        key: "mg",
        value: "mg",
      },
      {
        key: "micrograme",
        value: "micrograme",
      },
    ],
    Injection: [
      {
        key: "ml",
        value: "ml",
      },
    ],
    Syrup: [
      {
        key: "ml",
        value: "ml",
      },
    ],
  };

  const durationList = [
    {
      key: "day/s",
      value: "day/s",
    },
    {
      key: "week/s",
      value: "week/s",
    },
    {
      key: "month/s",
      value: "month/s",
    },
  ];

  let currentUserID;
  let DoctorMode = false;
  let by = "Patient";

  const updateUserID = () => {
    if (route.params?.PID != undefined) {
      currentUserID = route.params.PID;
      DoctorMode = true;
      by = user.fName;
      console.log("PID is not null", route.params.PID);
    } else {
      currentUserID = user._id;
      console.log("PID is null");
    }
  };

  useEffect(() => {
    console.log("Add Medication Page");
    console.log("Selected Item", selectedItem);
    updateUserID();
  }, []);

  useEffect(() => {
    // console.log(selectedItem);
    if (selectedItem) {
      // Populate the form fields with selectedItem values
      setMedicineName(selectedItem.medicine);
      setmediType(selectedItem.meditype);
      setunit(selectedItem.unit);
      setDateInput(selectedItem.addedDate);
      setPillAmount(selectedItem.pills.toString());
      setfrequency(selectedItem.frequency);
      setnoofDays(selectedItem.days.toString());
      setchoosePeriod(selectedItem.times.toString());
      setDuration(selectedItem.duration);
      setChecked(selectedItem.baw);
      setdescription(selectedItem.description);
      setisEdit(true);
    }
  }, [selectedItem]);

  //refresh medications when add a new medication
  const refreshMedicationView = () => {
    console.log(
      "refresh",
      route.params
        ? route.params.PID
          ? route.params.PID
          : undefined
        : undefined
    );
    navigation.navigate("MedicationView", {
      refresh: true,
      PID: route.params
        ? route.params.PID
          ? route.params.PID
          : undefined
        : undefined,
    });
  };

  //generate and store all dates between start date and end date in an array
  const generateDateRange = (startDate, numberOfDays) => {
    if (frequency === "hour" || frequency === "day") {
      if (duration == "month/s") {
        numberOfDays = numberOfDays * 30;
      } else if (duration == "week/s") {
        numberOfDays = numberOfDays * 7;
      } else {
        numberOfDays = numberOfDays * 1;
      }
      const endDate = addDays(startDate, numberOfDays - 1);
      const dates = eachDayOfInterval({ start: startDate, end: endDate });
      return dates.map((date) => format(date, "yyyy-MM-dd"));
    } 
    else if (frequency === "every other day") {
      if (duration == "month/s") {
        numberOfDays = numberOfDays * 30;
      } else if (duration == "week/s") {
        numberOfDays = numberOfDays * 7;
      } else {
        numberOfDays = numberOfDays * 1;
        numberOfDays*=2;
      }
      const dates = [];
      for (let i = 0; i < numberOfDays; i += 2) {
        dates.push(format(addDays(startDate, i), "yyyy-MM-dd"));
      }
      return dates;
    }
  };

  const dayArray = generateDateRange(dateInput, noofdays);

  //add new medication to the database
  const addmedication = () => {
    updateUserID();

    if (
      !medicineName ||
      !dateInput ||
      !pillAmount ||
      !noofdays ||
      !choosePeriod ||
      !checked
    ) {
      Alert.alert("All fields are required", "Please fill all fields");
    }  else {
      const payload = {
        sDate: sDate,
        userID: currentUserID,
        addedBy: by,
        medicine: medicineName,
        meditype: mediType,
        unit: unit,
        addedDate: dateInput,
        pills: pillAmount,
        days: noofdays,
        dayArray: dayArray,
        times: choosePeriod,
        frequency: frequency,
        duration: duration,
        baw: checked,
        description: description,
      };
      api
        .post(`${baseUrl}/medication/add`, payload)
        .then(() => {
          console.log("add", mediType, unit, frequency, duration);
          refreshMedicationView();
          AlertBox();
          setisEdit(false);
        })
        .catch((error) => {
          console.error("Axios Error : ", error);
        });
    }
  };

  //update existing medication in the database
  const updatemedication = (id) => {
    updateUserID();
    if (
      !medicineName ||
      !dateInput ||
      !pillAmount ||
      !noofdays ||
      !choosePeriod ||
      !checked
    ) {
      Alert.alert("All fields are required", "Please fill all fields");
    } else {
    const payload = {
      sDate: sDate,
      userID: currentUserID,
      medicine: medicineName,
      meditype: mediType,
      unit: unit,
      addedDate: dateInput,
      pills: pillAmount,
      days: noofdays,
      dayArray: dayArray,
      times: choosePeriod,
      frequency: frequency,
      duration: duration,
      baw: checked,
      description: description,
    };
    api
      .put(`${baseUrl}/medication/update/${id}`, payload)
      .then((response) => {
        console.log("update", mediType, unit, frequency, duration);
        AlertBox();
        setisEdit(false);
        refreshMedicationView();
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
    }
  };

  //show alert when press the add medication button
  const AlertBox = () => {
    Alert.alert(
      "Successful message",
      `${isEdit ? "Update" : "Add"} medication to the calendar successfully.`
    );
  };

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const validateDate = () => {
    // Regular expression for yyyy-mm-dd format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (dateRegex.test(dateInput)) {
      if (!isEdit) {
        addmedication();
      } else {
        updatemedication(selectedItem._id);
      }
    } else {
      Alert.alert('Error', 'Please enter the date in yyyy-mm-dd format.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header name={isEdit ? "Update Medications" : "Add Medications"} />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.topics}>Name of Medicine</Text>
          <View style={styles.nameContainer}>
            <TextInput
              placeholder="Name of Medicine"
              style={styles.textName}
              onChangeText={text => setMedicineName(text)}
              value={medicineName}
            />
            <TouchableOpacity onPress={() => {}}>
              <EvilIcons name="search" size={26} color="gray" />
            </TouchableOpacity>
          </View>
          <Text style={styles.topics}>Medication Strength</Text>
          <View style={styles.strengthContainer}>
            <View style={{ marginBottom: 10 }}>
              <SelectList
                setSelected={setmediType}
                data={mediTypeList}
                placeholder="Tablet"
                boxStyles={{ borderRadius: 15, backgroundColor: "white" }}
                // inputStyles={{ backgroundColor: "white" }}
                defaultOption={{ key: mediType, value: mediType }}
                value={mediType}
              />
            </View>
            <SelectList
              setSelected={setunit}
              data={unitList[mediType]}
              placeholder="mg"
              boxStyles={{ borderRadius: 15, backgroundColor: "white" }}
              defaultOption={unitList[mediType].find(item => item.key === unit)}
              value={unit}
            />
          </View>

          <Text style={styles.topics}>Starting Date</Text>
          {/* <Text style={styles.subtopics}>When do you start medication?</Text> */}
          <View style={styles.nameContainer}>
            <TextInput
              placeholder="yyyy-mm-dd"
              onChangeText={setDateInput}
              style={styles.textName}
              value={dateInput}
            />
            <TouchableOpacity onPress={handleOnPressStartDate}>
              <EvilIcons name="calendar" size={28} color="gray" />
            </TouchableOpacity>
          </View>

          {/*create modal for date picker */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  //minimumDate={startingDate}
                  onSelectedChange={(day) => {
                    const formattedDate = day.replace(/\//g, "-");
                    setDateInput(formattedDate);
                    console.log(formattedDate);
                  }}
                  options={{
                    backgroundColor: "white",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "black",
                    selectedTextColor: "black",
                    mainColor: "#469ab6",
                    textSecondaryColor: "black",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                />

                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={{ color: "black" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Text style={styles.topics}>Dosage</Text>
          {/* <Text style={styles.subtopics}>
            How many pills need to take at once? & How long?
          </Text> */}
          <View style={styles.topicContainer}>
            <View style={styles.nametimeContainer1}>
              <TextInput
                placeholder="dosage"
                onChangeText={text => setPillAmount(Number(text))}
                keyboardType="numeric"
                style={styles.texttime1}
                value={pillAmount.toString()}
              />
            </View>
            <View style={styles.dosUnitText}>
              {mediType === "Tablet" ? <Text>tablet/s</Text> : <Text>ml</Text>}
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={styles.topics}>Time/s</Text>
              <View style={styles.nametimeContainer2}>
                <TextInput
                  placeholder="time/s"
                  onChangeText={text => setchoosePeriod(Number(text))}
                  keyboardType="numeric"
                  style={styles.texttime2}
                  value={choosePeriod.toString()}
                />
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={styles.topics}>Frequency</Text>
              <View style={styles.freqdropdown}>
                <SelectList
                  setSelected={setfrequency}
                  data={frequencyList}
                  placeholder="day"
                  boxStyles={{ borderRadius: 15, backgroundColor: "white" }}
                  defaultOption={frequencyList.find(item => item.key === frequency)}
                  value={frequency}
                />
              </View>
            </View>
          </View>

          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={styles.topics}>Duration</Text>
              <View style={styles.nametimeContainer3}>
                <TextInput
                  placeholder="duration"
                  onChangeText={text => setnoofDays(Number(text))}
                  keyboardType="numeric"
                  style={styles.texttime3}
                  value={noofdays.toString()}
                />
              </View>
            </View>
            <View style={styles.nametimeContainer4}>
              <SelectList
                setSelected={setDuration}
                data={durationList}
                placeholder="day/s"
                boxStyles={{ borderRadius: 15, backgroundColor: "white" }}
                defaultOption={{ key: duration, value: duration }}
                value={duration}
              />
            </View>
          </View>

          <Text style={styles.topics}>Food & Pill</Text>
          {/* <Text style={styles.subtopics}>
              What's the time you need to take pill?
            </Text> */}
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
            value={description}
          />
          <View style={{ alignItems: "center", padding: 10 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                validateDate();
              }}
            >
              <Text style={styles.buttontext}>
                {isEdit ? "Update Medication" : "Add Medication"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  strengthContainer: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  topicContainer: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  texttime1: {
    backgroundColor: "white",
    height: 40,
    width: "60%",
    marginLeft: 10,
    marginRight: 10,
  },
  texttime2: {
    backgroundColor: "white",
    height: 40,
    width: "80%",
    marginLeft: 10,
    marginRight: 10,
  },
  texttime3: {
    backgroundColor: "white",
    height: 40,
    width: "80%",
    marginLeft: 10,
  },
  nametimeContainer1: {
    marginTop: 5,
    marginBottom: 5,
    width: "55%",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
  nametimeContainer2: {
    marginTop: 5,
    marginBottom: 5,
    width: "55%",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  nametimeContainer3: {
    marginTop: 5,
    marginBottom: 5,
    width: "60%",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  nametimeContainer4: {
    marginLeft: -70,
    marginTop: 30,
  },
  freqdropdown: {
    width: "80%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    width: "95%",
    height: "80%",
    padding: 15,
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
  },
  topics: {
    marginTop: 5,
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
  dosUnitText: {
    paddingTop: 15,
    marginLeft: -100,
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
