import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Components & Pages Import
import WelcomeScreen from "./src/screens/WelcomeScreen/WelcomeScreen";
import DoctorRegister from "./src/screens/AuthenticationScreens/DoctorAuthentication/DoctorRegister";
import PatientRegister from "./src/screens/AuthenticationScreens/PatientAuthentication/PatientRegister";
import PatientLogin from "./src/screens/AuthenticationScreens/PatientAuthentication/PatientLogin";
import PatientDashboard from "./src/screens/DashboardScreens/PatientDashboard";
import MedicalHistory from "./src/screens/MedicalHistory";
import TestSelection from "./src/screens/MedicalTestHomeScreen/TestSelectionScreen/TestSelectionHomeScreen";
import StepCounterHome from "./src/screens/MedicalTestHomeScreen/TestSelectionScreen/StepCounterScreen/StepCounterHomeScreen";
import BreathingHome from "./src/screens/MedicalTestHomeScreen/TestSelectionScreen/BreathingTestScreen/BreathingHomeScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import DoctorLogin from "./src/screens/AuthenticationScreens/DoctorAuthentication/DoctorLoginScreen";
import MedicalIncidentHomeScreen from "./src/screens/AddMedicalIncidentScreen/MedicalIncidentHomeScreen";
import MedicalIncidentDetailScreen from "./src/screens/AddMedicalIncidentScreen/MedicalIncidentDetailScreen";
import PatientsScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/PatientsScreen";
import PatientProfileScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/PatientprofileScreen";
import PatientHistoryScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/PatientsHistoryScreen";
import DoctorDashboard from "./src/screens/DashboardScreens/DoctorDashboard";
import SelectDocForAccessScreen from "./src/screens/GiveDocAccess/SelectDocForAccessScreen";
import GiveDocAcessScreen from "./src/screens/GiveDocAccess/GiveDocAccessScreen";
import CustomHeader from "./src/screens/ViewPatientSummaryHome Screen/Components/CustomHeader";
import MedicalIdFalseScreen from "./src/screens/AuthenticationScreens/DoctorAuthentication/MedicalIdFalseScreen";
import Header from "./src/components/Header";
import MedicationView from "./src/screens/MedicationToCalendar/MedicationViewInCalendarHome";
import MedicationsScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/MedicationsScreen";
import AddMedication from "./src/screens/MedicationToCalendar/AddMedicationPage";
import ViewMedication from "./src/screens/MedicationToCalendar/ViewMedicationPage";
import NewMedicalRecordScreen from "./src/screens/AddMedicalRecordScreen/NewMedicalRecordScreen";
import MyprofileScreen from "./src/screens/PatientMyProfileScreen/MyprofileScreen";
import AddExternalTestResults from "./src/screens/ExternalTestResults/AddExternalTestResults/AddExternalTestResults";
import ViewExternalTestResults from "./src/screens/ExternalTestResults/ViewExternalTestResults/ViewExternalTestResult";

import { useAuthContext } from "./src/hooks/useAuthContext";

const Stack = createNativeStackNavigator();

export default function Routing() {
  const { user } = useAuthContext();

  return (
    <NavigationContainer>
      {/* {user ? console.log("User: ", user) : console.log("User is not logged in")}
      {user?.roles === "doctor" ? console.log("Doctor") : console.log("Patient")} */}

      <Stack.Navigator
        // initialRouteName="WelomeScreen"
        // initialRouteName="DoctorDashboard"
        initialRouteName="PatientDashboard"
        screenOptions={{
          headerStyle: { backgroundColor: "#FBDABB" },
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ title: "Home" }}
        />

        {/* Authentication Screens */}

        <Stack.Screen name="DoctorLogin" component={DoctorLogin} />
        <Stack.Screen name="DoctorRegister" component={DoctorRegister} />
        <Stack.Screen
          name="MedicalIdFalseScreen"
          component={MedicalIdFalseScreen}
        />
        <Stack.Screen name="PatientRegister" component={PatientRegister} />
        <Stack.Screen name="PatientLogin" component={PatientLogin} />

        {/* Patient Screens */}
        {/* {console.log("USER role: ", user?.roles)} */}

        <Stack.Screen name="PatientDashboard" component={PatientDashboard} />
        <Stack.Screen name="MedicalHistory" component={MedicalHistory} />

        <Stack.Screen name="TestSelection" component={TestSelection} />
        <Stack.Screen name="StepCounterHome" component={StepCounterHome} />
        <Stack.Screen name="BreathingHome" component={BreathingHome} />

        <Stack.Screen
          name="NewMedicalRecordScreen"
          component={NewMedicalRecordScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MedicalIncidentHomeScreen"
          component={MedicalIncidentHomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SelectDocForAccessScreen"
          component={SelectDocForAccessScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GiveDocAccessScreen"
          component={GiveDocAcessScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="MedicationView" component={MedicationView} />
        <Stack.Screen name="AddMedication" component={AddMedication} />
        <Stack.Screen name="ViewMedication" component={ViewMedication} />

        <Stack.Screen
          name="MyprofileScreen"
          component={MyprofileScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddExternalTestResults"
          component={AddExternalTestResults}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ViewExternalTestResults"
          component={ViewExternalTestResults}
          options={{ headerShown: false }}
        />

        {/* Doctor Screens */}

        <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
        <Stack.Screen
          name="PatientsScreen"
          component={PatientsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PatientProfileScreen"
          component={PatientProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PatientHistoryScreen"
          component={PatientHistoryScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MedicationsScreen"
          component={MedicationsScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} /> */}

        {/* <Stack.Screen
          name="MedicalIdFalseScreen"
          component={MedicalIdFalseScreen}
          options={{ headerShown: false }}
        /> */}

        {/* <Stack.Screen name="ContactUs" component={ContactUs} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
