import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import { baseUrl } from "../../constants/constants";

const OTPVerificationScreen = ({ route, navigation }) => {
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false); // New state variable for resend OTP loading

  const { email } = route.params;

  const handleVerifyOTP = async () => {
    try {
      setLoading(true); // Set loading to true when verifying OTP

      // Verify OTP request
      const response = await fetch(baseUrl + "/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }), // Include email and OTP in the request body
      });
      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", data.message);
        navigation.navigate("ResetPasswordScreen", {
          email,
          accessToken: data.accessToken,
        });
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      console.log("Error verifying OTP:", error);
      Alert.alert(
        "Error",
        "An error occurred while verifying OTP. Please try again."
      );
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendLoading(true); // Set resend loading to true when resend OTP is initiated

      // Resend OTP request
      const response = await fetch(baseUrl + "/resendOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", data.message);
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      console.log("Error resending OTP:", error);
      Alert.alert(
        "Error",
        "An error occurred while resending OTP. Please try again."
      );
    } finally {
      setResendLoading(false); // Set resend loading to false regardless of success or failure
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOTP}
        editable={!resendLoading} 
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerifyOTP}
        disabled={loading || resendLoading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" /> // Show loading indicator if verifying OTP
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={handleResendOTP}
        disabled={resendLoading}
      >
        {resendLoading ? (
          <ActivityIndicator color="#30A8DE" /> // Show loading indicator if resending OTP
        ) : (
          <Text>Resend OTP</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FEFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#00567D",
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#30A8DE",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    color: "#30A8DE",
    textDecorationLine: "underline",
  },
});

export default OTPVerificationScreen;
