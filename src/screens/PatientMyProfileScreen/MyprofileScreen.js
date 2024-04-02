import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import Header from "../../components/Header";
import DetailRow from "./components/DetailRow";


const MyprofileScreen = () => {
  return (
    <View style={styles.maincontainer}>
      <Header name="My Profile" />
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity>
            <View style={styles.profileImageContainer}>
              <Image
                source={require("../../../assets/patient.png")}
                style={styles.profileImage}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.yourinfo}>Your Info</Text>
          <View>
            <DetailRow
              name="user-alt"
              textLineOne="Full Name"
              textLineTwo="Didula Sri Lakpriya"
            />
            <DetailRow
              name="envelope"
              textLineOne="Email Address"
              textLineTwo="diduladdsl@gmail.com"
            />
            <DetailRow
              name="mobile"
              textLineOne="Mobile Number"
              textLineTwo="0705841668"
            />
            <DetailRow
              name="birthday-cake"
              textLineOne="Birthday"
              textLineTwo="2001/01/10"
            />
            <DetailRow
              name="venus-mars"
              textLineOne="Gender"
              textLineTwo="Male"
            />
          </View>
          
        </View>
        
        <View style={styles.container}>
        <Text style={styles.yourinfo}>Health Info</Text>
          <View>
            <DetailRow
              name="weight-hanging"
              textLineOne="Weight"
              textLineTwo="60 Kg"
            />
            <DetailRow
              name="arrows-alt-v"
              textLineOne="Height"
              textLineTwo="172 cm"
            />
            <DetailRow
              name="tint"
              textLineOne="Blood Group"
              textLineTwo="O+"
            />
          </View>
          </View>
      </ScrollView>
    </View>
  );
};
export default MyprofileScreen;
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#D9F8FF",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%",
  },

  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
  },
  yourinfo: {
    fontSize: 16,
    marginLeft: 30,

    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
