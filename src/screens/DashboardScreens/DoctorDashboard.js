import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const DoctorDashboard = ({ navigation }) => {
  const { user } = useAuthContext();
  console.log("User in DoctorDashboard:", user.fName);
  const { logout } = useLogout();
  const [greeting, setGreeting] = useState("");
  const [formattedDate, setFormattedDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  useEffect(() => {
    const getCurrentGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        return "Good Morning";
      } else if (currentHour < 15) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    };
    const getFormattedDate = () => {
      const date = new Date();
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      return { day, month, year };
    };
    setGreeting(getCurrentGreeting());
    setFormattedDate(getFormattedDate());
  }, []);
  const { day, month, year } = formattedDate;
  console.log("Day:", day, "Month:", month, "Year:", year);
  return (
    <View style={styles.container}>
      {/* // Top Panel */}
      <View style={styles.topPanel}>
        <View style={styles.mainbar}>
          <Text style={styles.titleMain}>CareSync</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DoctorProfileScreen");
            }}
          >
            <View style={styles.iconContainer}>
              <Image
                source={require("../../../assets/Person.png")}
                style={styles.profileImage}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>{greeting},</Text>
          <Text style={styles.greetingTextName}>Dr.{user.fName}</Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.allPatientCon}>
            <AntDesign name="calendar" size={30} color="black" />
            <Text style={styles.day}>{day}</Text>
            <Text style={styles.month}>{month}</Text>
            <Text style={styles.year}>{year}</Text>
          </View>
        </View>
      </View>

      {/* // Dashboard Buttons */}
      <View style={styles.dashboardContainer}>
        <View style={styles.dashboardButtonContainer}>
          {/* /* // View Patient Summery Button * */}
          <TouchableOpacity
            style={styles.dashboardButtonMyPatient}
            onPress={() => {
              navigation.navigate("PatientsScreen");
            }}
          >
            <Fontisto name="stethoscope" size={60} color="black" />
            <Text style={styles.dashboardButtonTextMypatient}>My Patients</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dashboardButtonLogout}
            onPress={() => {
              logout();
              navigation.navigate("WelcomeScreen");
            }}
          >
            <SimpleLineIcons name="logout" size={30} color="white" />
            <Text style={styles.dashboardButtonTextLogOut}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <TouchableOpacity style={styles.roundedPlusButton}>
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FEFF",
  },
  topPanel: {
    flex: 1,

    backgroundColor: "#00567D",
    paddingHorizontal: 15,
  },
  mainbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleMain: {
    position: "absolute",
    top: 30,
    left: 20,
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  greetingContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  greetingText: {
    fontSize: 35,
    top: 30,
    fontWeight: "bold",
    color: "white",
  },

  greetingTextName: {
    fontSize: 45,
    top: 30,
    fontWeight: "bold",
    color: "white",
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: 100,
  },
  allPatientCon: {
    width: 110,
    height: 160,
    borderRadius: 40,
    color: "white",
    marginLeft: 0,
    borderColor: "#43E5E8",
    borderWidth: 5,
    backgroundColor: "#F7FEFF",
    justifyContent: "center",
    alignItems: "center",
  },
  day: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#7a1270",
  },
  month: {
    fontSize: 18,
  },
  year: {
    fontSize: 18,
  },

  profileImage: {
    width: "80%",
    height: "80%",
  },

  dashboardContainer: {
    flex: 1,

    marginTop: 80,
    paddingHorizontal: 15,
  },

  dashboardButtonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  dashboardButtonMyPatient: {
    width: 160,
    height: 180,
    backgroundColor: "#F7FEFF",
    borderRadius: 15,
    marginBottom: 60,
    borderColor: "#B368DE",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  dashboardButtonLogout: {
    width: 200,
    height: 60,
    backgroundColor: "#E35977",
    borderRadius: 30,
    marginBottom: 20,
    borderColor: "#E35977",
    borderWidth: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  dashboardImage: {
    width: "80%",
    height: "70%",

    backgroundColor: "#fff",
  },
  dashboardButtonTextMypatient: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c3e50",
  },
  dashboardButtonTextLogOut: {
    fontSize: 18,
    left: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginHorizontal: 10,
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    left: 320,
    marginTop: 30,
    width: 45,
    height: 45,
    borderRadius: 50,

    backgroundColor: "#eee",
  },
});

export default DoctorDashboard;
