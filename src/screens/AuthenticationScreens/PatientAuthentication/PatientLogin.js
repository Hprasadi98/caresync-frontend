import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

// import { baseUrl } from "../../../constants/constants";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLogin } from "../../../hooks/useLogin";

const PatientLogin = ({ navigation }) => {
  const { login } = useLogin();
  const { user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const data = await login(email, password, "signin");
    if (data.status === "success") {
      navigation.navigate("PatientDashboard");
    } else if (data.status === "failed") {
      Alert.alert("Error", "Invalid email or password");
    } else if (data.status === "error") {
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Login Screen</Text>

      <Image
        source={require("../../../../assets/doc.png")}
        style={styles.docimg}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("PatientRegister")}>
        <Text style={styles.linkText}>New here? Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ForgotPassword", { userType: "patient"})
        }
      >
        <Text style={styles.linkText}>Forgot Password?</Text>
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
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#00567D",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  loginButton: {
    backgroundColor: "#30A8DE",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  linkText: {
    color: "#00567D",
    marginTop: 10,
  },
});

export default PatientLogin;
