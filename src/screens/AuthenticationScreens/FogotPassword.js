import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { z } from "zod";

// Import any necessary constants or utilities

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      // Validate email format (if needed)
      // validate using zod or regex
      const validateEmail = z.string().email();
      const result = validateEmail.safeParse(email);
      if (!result.success) {
        Alert.alert("Error", "Please enter a valid email address.");
        return;
      }

      //send a reset password email to the user

      const response = await fetch(baseURL + "/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
        const data = await response.json();

        // Handle response from the server

        if (response.ok) {
            Alert.alert("Success", data.message);
            }
        else {
            Alert.alert("Error", data.error);
            }
    } catch (error) {
        console.log("Error resetting password:", error);
        Alert.alert(
            "Error",
            "An error occurred while resetting password. Please try again."
        );
    }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Back to Login</Text>
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

export default ForgotPassword;
