// import React, { useState } from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";
// import styles from "./homeStyles";

// const WelcomeScreen = ({ navigation }) => {
//   const [selectedAccountType, setSelectedAccountType] = useState(null);

//   const handleSelectAccountType = (accountType) => {
//     setSelectedAccountType(accountType);
//   };

//   const handleRegister = () => {
//     if (selectedAccountType === "Doctor") {
//       navigation.navigate("DoctorRegister");
//     } else if (selectedAccountType === "Patient") {
//       navigation.navigate("PatientRegister");
//     }
//   };

//   const handleLogin = () => {
//     if (selectedAccountType === "Doctor") {
//       navigation.navigate("DoctorLogin");
//     } else if (selectedAccountType === "Patient") {
//       navigation.navigate("PatientLogin");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.titleMain}>CareSync</Text>
//       <Image
//         source={require("../../../assets/homelogo.png")}
//         style={styles.logo}
//       />
//       <Text style={styles.title}>I am a </Text>

//       <TouchableOpacity
//         style={[
//           styles.button,
//           selectedAccountType === "Doctor" && styles.selectedButton,
//         ]}
//         onPress={() => handleSelectAccountType("Doctor")}
//       >
//         <Text
//           style={[
//             styles.buttonText,
//             selectedAccountType === "Doctor" && styles.selectedButtonText,
//           ]}
//         >
//           Doctor
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[
//           styles.button,
//           selectedAccountType === "Patient" && styles.selectedButton,
//         ]}
//         onPress={() => handleSelectAccountType("Patient")}
//       >
//         <Text
//           style={[
//             styles.buttonText,
//             selectedAccountType === "Patient" && styles.selectedButtonText,
//           ]}
//         >
//           Patient
//         </Text>
//       </TouchableOpacity>

//       {selectedAccountType && (
//         <View style={styles.bottomContainer}>
//           <TouchableOpacity
//             style={styles.bottomButton}
//             onPress={handleRegister}
//           >
//             <Text style={styles.buttonText}>Register</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.bottomButton} onPress={handleLogin}>
//             <Text style={styles.buttonText}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// export default WelcomeScreen;
