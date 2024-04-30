import React, { useState,useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView,FlatList } from "react-native";
import Header from "../../components/Header";
import PatientHistoryGrid from "../ViewPatientSummaryHome Screen/Components/PatientHistoryGrid";

import axios from "axios";


function DisplayMedicalRecords({ navigation }) {
    const [patientsHistory, setPatientsHistory] = useState([]);

    useEffect(() => {
        fetchPatientsHistory();
    }, []);

    const fetchPatientsHistory = async () => {
        try {
            const response = await axios.get(
                'http://10.10.28.233:4010/api/medicalIncident'
            );
            console.log("Response from backend:", response.data);
            setPatientsHistory(response.data);
        } catch (error) {
            console.error("Error fetching patientsHistory:", error);
        }
    };
    function renderCategoryItem({ item }) {


        return (
            <View>
                <PatientHistoryGrid
                    
                    recordName={item.recordName}
                    date={item.date}
                    incidentType={item.incidentType}
                    recordDescription={item.recordDescription}
                    testType={item.testType}
                    // selectedOption2={item.selectedOption2}
                />
                {/* export data to PatientHistoryGrid page */}
            </View>
        );
    }
    return (
        <SafeAreaView>
            <Header name="Past Medical Records" />
            <View style={styles.background}>
                <View style={styles.container}>
                <FlatList
                    data={patientsHistory}
                    keyExtractor={(item) => item._id}
                    renderItem={renderCategoryItem}
                  
                />
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("NewMedicalRecordScreen")}>
                    <Text style={styles.btntext}>AddNew</Text>
                </TouchableOpacity >
                </View>
                
            </View>



        </SafeAreaView>



    );


}
export default DisplayMedicalRecords;

const styles = StyleSheet.create({
    btn: {

        margin: '2%',
        backgroundColor: '#00567D',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        maxWidth: '100%',
        padding: 2,
      
    },
    btntext: {
        color: '#FFF',
        padding: 8,
        fontSize: 18,
        fontWeight: 'bold',

    },
    container: {
        flexDirection: 'column',
        width: '100%',
        height: '77%',
        backgroundColor: '#FFFF',

    },
    background: {
        backgroundColor: '#DEFFFB',
        width: '100%',
        height: '100%',
        padding: 15,
    },
});