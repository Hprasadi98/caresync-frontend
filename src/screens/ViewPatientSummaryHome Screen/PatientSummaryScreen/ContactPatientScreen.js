import { Text, StyleSheet, FlatList, View, ScrollView } from "react-native";
import Header2 from "../Components/Header2";
import ContactPatientData from "../Components/ContactPatientData";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../../../constants/constants";

import axios from "axios";

function ContactPatientScreen() {
  const [details, setDetails] = useState([]);
  const [_id, setId] = useState("662e930c4c0bf9f41d0da56a");

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    axios
      .get(`${baseUrl}/patients`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };
  return (
    <View style={styles.maincontainer}>
      <Header2 text="Contact Patient" />

      <View style={styles.container}>
        <Text style={styles.contactinfo}>Contacts</Text>
        {details.map((data, index) => {
          if (data._id === _id) {
            return (
              <React.Fragment key={index}>
                <ContactPatientData
                  name="user-alt"
                  textLineOne="Full Name"
                  textLineTwo={`${data.firstName} ${data.lastName}`}
                  category="fullName"
                  backgroundColor="#FEFFE0"
                />
                <ContactPatientData
                  name="envelope"
                  textLineOne="Email Address"
                  textLineTwo={data.email}
                  category="email"
                  backgroundColor="#FEFFE0"
                  color="#00567D"
                />
                <ContactPatientData
                  name="mobile"
                  textLineOne="Mobile Number"
                  textLineTwo={data.mobileNumber}
                  category="mobile"
                  backgroundColor="#FEFFE0"
                  color="#00567D"
                />
                <ContactPatientData
                  name="home"
                  textLineOne="Address"
                  textLineTwo={data.birthday}
                  category="birthday"
                  backgroundColor="#FEFFE0"
                />
              </React.Fragment>
            );
          }
          return null;
        })}
      </View>
    </View>
  );
}
export default ContactPatientScreen;
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#E3F7FF",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%",
  },
  contactinfo: {
    fontSize: 20,
    marginLeft: 12,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
