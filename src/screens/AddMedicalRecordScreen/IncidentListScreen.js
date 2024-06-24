import React, { useState, useEffect } from "react";
import {
   View,
   TouchableOpacity,
   Linking,
   Text,
   Animated,
   StyleSheet,
   Alert,
   SafeAreaView,
   ScrollView,
   Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../Services/AuthService";
import { baseUrl } from "../../constants/constants";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/Header";

const formatDate = (dateString) => {
   const date = new Date(dateString);
   const year = date.getFullYear();
   const month = `0${date.getMonth() + 1}`.slice(-2);
   const day = `0${date.getDate()}`.slice(-2);
   return `${year}/${month}/${day}`;
};

const handleLinkPress = (url) => {
   Linking.openURL(url).catch((err) => console.error("An error occurred", err));
};

const truncateText = (text, maxLength) => {
   if (text && text.length > maxLength) {
      return `${text.substring(0, 30)}...`;
   }
   return text;
};

function IncidentListScreen({
   route,
   navigation,
   recordName,
   recordID,
   recordDescription,
   incidents = [],
}) {
   const { record } = route.params;
   const [medicalincidents, setMedicalincidents] = useState([]);

   const fetchMedicalIncidents = async () => {
      try {
         const response = await api.get(`${baseUrl}/medicalRecord/getRecord`, {
            params: {
               recordID: record._id,
            },
         });
         setMedicalincidents(response.data.currentRecord.incidents);
      } catch (error) {
         console.error("Error fetching medical incidents:", error);
      }
   };
   console.log(record._id);
   useEffect(() => {
      fetchMedicalIncidents();
   }, []);

   const handleAddNew = () => {
      navigation.navigate("MedicalIncidentHomeScreen", {
         recordName,
         recordDescription,

         recordID: record._id,
      });
   };


   const deleteHandler = (incidentID, recordID, incidentType) => {
      Alert.alert(
         "Confirm Deletion",
         "Are you sure you want to delete this incident?",
         [
            {
               text: "Cancel",
               style: "cancel",
            },
            {
               text: "OK",
               onPress: async () => {
                  try {
                     const response = await api.delete(
                        `${baseUrl}/medicalIncident/${incidentType}/delete/${record._id}/${incidentID}`
                     );
                     if (response.status === 200) {
                        setMedicalincidents((prevIncidents) => {
                           const updatedIncidents = { ...prevIncidents };
                           updatedIncidents[incidentType] = updatedIncidents[incidentType].filter(
                              (item) => item._id !== incidentID
                           );
                           return updatedIncidents;
                        });
                     } else {
                        console.error("Failed to delete incident:", response.data);
                     }
                  } catch (error) {
                     console.error("Error deleting incident:", error);
                  }
               },
            },
         ]
      );
   };

   return (
      <SafeAreaView style={styles.safeArea}>
         <Header name={record.recordName} />
         <ScrollView>
            <View style={styles.background}>
               <View style={styles.container}>
                  <View style={styles.recordContainer}>
                     <View>
                        <Text style={styles.label}>Record Name:</Text>
                        <Text style={styles.recordValue}>{record.recordName}</Text>
                     </View>
                     <View>
                        <Text style={styles.label}>Description:</Text>
                        <Text style={styles.recordValue}>{record.description}</Text>
                     </View>
                     <View>
                        <Text style={styles.label}>Date:</Text>
                        <Text style={styles.recordValue}>{formatDate(record.recordDate)}</Text>
                     </View>
                  </View>

                  <View style={styles.incidentsContainer}>
                     <View>
                        <Text style={styles.sectionHeader}>Test Incidents</Text>
                        {medicalincidents.testIncidents?.map((incident, index) => (
                           <View key={index} style={[styles.subcom, { backgroundColor: "#FEFFE0" }]}>
                              <View style={[styles.innertile, { backgroundColor: "#FFEBA5" }]}>
                                 <Text style={styles.innertext}>TEST</Text>
                              </View>
                              <Text style={styles.date}>{formatDate(incident.date)}</Text>
                              <Text style={styles.subtext}>{incident.testType}</Text>
                              <Text style={styles.provider}>
                                 Tested On: {formatDate(incident.testDate)}{" "}
                              </Text>
                              <Text style={styles.provider}>Test Provider:{incident.provider} </Text>
                              <Text style={styles.provider}>Result: {incident.result} </Text>
                              {incident.resultLink && (
                                 <TouchableOpacity onPress={() => handleLinkPress(incident.resultLink)}>
                                    <Text style={[styles.provider, { color: "blue" }]}>
                                       {incident.resultLink}{" "}
                                    </Text>
                                 </TouchableOpacity>
                              )}
                              <TouchableOpacity
                                 onPress={() => deleteHandler(incident._id, recordID, "testIncidents")}
                                 style={styles.deletebutton}
                              >
                                 <MaterialIcons name="delete" size={24} color="black" />
                              </TouchableOpacity>
                           </View>
                        ))}
                     </View>

                     <View>
                        <Text style={styles.sectionHeader}>Symptom Incidents</Text>
                        {medicalincidents.symptomIncidents?.map((incident, index) => (
                           <View key={index} style={[styles.subcom, { backgroundColor: "#FFEBEB" }]}>
                              <View style={[styles.innertile, { backgroundColor: "#FF9999" }]}>
                                 <Text style={styles.innertext}>SYMPTOM</Text>
                              </View>
                              <Text style={styles.date}>{formatDate(incident.symptomDate)}</Text>
                              <Text style={styles.subtext}>{incident.symptomType}</Text>
                              <Text style={[styles.provider, { color: "brown" }]}>
                                 Note:{incident.symptomDescription}
                              </Text>
                              <Text style={styles.provider}>
                                 Frequency: {incident.symptomFrequency}
                              </Text>
                              <Text style={styles.provider}>
                                 Severity: {incident.severity}
                              </Text>
                              <Text style={styles.provider}>
                                 Duration: {incident.symptomDuration}
                              </Text>
                              <Text style={styles.provider}>
                                 Appetite: {incident.appetite}
                              </Text>
                              <Text style={styles.provider}>Weight: {incident.weight}</Text>
                              <TouchableOpacity
                                 onPress={() => deleteHandler(incident._id, recordID, "symptomIncidents")}
                                 style={styles.deletebutton}
                              >
                                 <MaterialIcons name="delete" size={24} color="black" />
                              </TouchableOpacity>
                           </View>
                        ))}
                     </View>

                     <View>
                        <Text style={styles.sectionHeader}>Appointment Incidents</Text>
                        {medicalincidents.appointmentIncidents?.map((incident, index) => (
                           <View key={index} style={[styles.subcom, { backgroundColor: "#E0FFE0" }]}>
                              <View style={[styles.innertile, { backgroundColor: "#99FF99" }]}>
                                 <Text style={styles.innertext}>APPOINTMENT</Text>
                              </View>
                              <Text style={styles.date}>{formatDate(incident.date)}</Text>
                              <Text style={styles.subtext}>Dr.{incident.doctorName}</Text>
                              <Text style={styles.provider}>
                                 Scheduled On: {formatDate(incident.appointmentDateTime)}
                              </Text>
                              <Text style={styles.provider}>
                                 Type: {incident.appointmentType}
                              </Text>
                              <Text style={[styles.provider, { color: "brown" }]}>
                                 Note:{incident.description}
                              </Text>
                              <TouchableOpacity
                                 onPress={() => deleteHandler(incident._id, recordID, "appointmentIncidents")}
                                 style={styles.deletebutton}
                              >
                                 <MaterialIcons name="delete" size={24} color="black" />
                              </TouchableOpacity>
                           </View>
                        ))}
                     </View>

                     <View>
                        <Text style={styles.sectionHeader}>Prescription Incidents</Text>
                        {medicalincidents.prescriptionIncidents?.map((incident, index) => (
                           <View key={index} style={[styles.subcom, { backgroundColor: "#ebded4" }]}>
                              <View style={[styles.innertile, { backgroundColor: "#c4a092" }]}>
                                 <Text style={styles.innertext}>PRESCRIPTION</Text>
                              </View>
                              <Text style={styles.date}>{formatDate(incident.date)}</Text>
                              <Text style={styles.subtext}>Dr. {incident.doctorName}</Text>
                              <Text style={styles.provider}>
                                 Prescripted Date: {formatDate(incident.PrescriptionDate)}
                              </Text>
                              <Text style={[styles.provider, { color: "brown" }]}>
                                 Note: {incident.description}
                              </Text>
                              {incident.link && (
                                 <TouchableOpacity onPress={() => handleLinkPress(incident.link)}>
                                    <Text style={[styles.provider, { color: "blue" }]}>
                                       {incident.link}{" "}
                                    </Text>
                                 </TouchableOpacity>
                              )}
                              <TouchableOpacity
                                 onPress={() => deleteHandler(incident._id, recordID, "prescriptionIncidents")}
                                 style={styles.deletebutton}
                              >
                                 <MaterialIcons name="delete" size={24} color="black" />
                              </TouchableOpacity>
                           </View>
                        ))}
                     </View>
                  </View>
               </View >
            </View>
         </ScrollView>
         <Pressable style={styles.btn} onPress={handleAddNew}>
            <Text style={styles.btntext}>Add New Incident</Text>
         </Pressable>

      </SafeAreaView>
   );
}

export default IncidentListScreen;

const styles = StyleSheet.create({
   safeArea: {
      flex: 1,
   },
   recordContainer: {
      padding: 20,
      backgroundColor: "white",
      margin: 10,
      borderRadius: 10,
      elevation: 3,
   },
   container: {
      flexDirection: "column",
      width: "100%",

      backgroundColor: "#FFFF",
   },
   background: {
      backgroundColor: "#DEFFFB",
      width: "100%",
      height: "100%",
      padding: 15,
   },
   label: {
      fontWeight: "bold",
      fontSize: 16,
   },
   recordValue: {
      fontSize: 16,
      marginBottom: 10,
   },
   incidentsContainer: {
      padding: 20,
   },
   sectionHeader: {
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 10,
   },
   subcom: {
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
      elevation: 3,
   },
   innertile: {
      padding: 5,
      borderRadius: 5,
      marginBottom: 10,
   },
   innertext: {
      fontWeight: "bold",
      fontSize: 15,
   },
   date: {
      fontSize: 14,
      marginBottom: 5,
   },
   subtext: {
      fontSize: 14,
      marginBottom: 5,
   },
   provider: {
      fontSize: 14,
      marginBottom: 5,
   },
   deletebutton: {
      alignItems: "center",
      justifyContent: "center",
      // padding: 10,
      // backgroundColor: "red",
      borderRadius: 5,

   },
   btn: {
      backgroundColor: "#00567D",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      width: "93%",
      padding: 2,
      marginBottom: "4%",
      alignSelf: "center",
   },
   btntext: {
      color: "#FFF",
      padding: 8,
      fontSize: 17,
      fontWeight: "bold"
   },

});
