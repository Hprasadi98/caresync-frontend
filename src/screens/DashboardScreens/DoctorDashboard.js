import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useLogout } from "../../hooks/useLogout";

const DoctorDashboard = ({ navigation }) => {
  const { logout } = useLogout();

  return (
    <View style={styles.container}>
      {/* // Top Panel */}
      <View style={styles.topPanel}>
        <Text style={styles.titleMain}>CareSync</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DoctorProfileScreen");
          }}
        >
          <View style={styles.iconContainer}>
            <Image
              source={require("../../../assets/Person.png")}
              style={styles.dashboardImage}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* // Dashboard Buttons */}
      <View style={styles.dashboardContainer}>
        {/* // View Patient Summery Button */}
        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={() => {
            navigation.navigate("PatientsScreen");
          }}
        >
          <Image
            source={require("../../../assets/DocImage.png")}
            style={styles.dashboardImage}
          />
          <Text style={styles.dashboardButtonText}>View Patient Summary</Text>
        </TouchableOpacity>

        {/* // Logout Button */}
        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={() => {
            logout();
            navigation.navigate("WelcomeScreen");
          }}
        >
          <Image
            source={require("../../../assets/DocImage.png")}
            style={styles.dashboardImage}
          />
          <Text style={styles.dashboardButtonText}>LogOut</Text>
        </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 95,
    backgroundColor: "#00567D",
    paddingHorizontal: 15,
  },
  titleMain: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  profileButton: {
    width: 40,
    height: 40,
    left: 120,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#D9D9D9",
  },
  profileImageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "80%",
    height: "80%",
  },
  bellIcon: {
    width: 40,
    height: 40,
    right: 45,
    top: 3,
  },
  bellImage: {
    width: "60%",
    height: "90%",
  },
  dashboardContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: 15,
  },
  dashboardButton: {
    width: 163,
    height: 163,
    backgroundColor: "#D9F8FF",
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  dashboardImage: {
    width: "80%",
    height: "70%",
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  dashboardButtonText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c3e50",
  },
  roundedPlusButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#3498db",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  plusButtonText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    width: 40, // Adjust size as needed
    height: 40, // Adjust size as needed
    borderRadius: 50, // Adjust radius for rounded corners
    overflow: "hidden",
    backgroundColor: "#eee", // Placeholder color
  },
});

export default DoctorDashboard;
