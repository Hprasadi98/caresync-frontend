import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState,useEffect } from "react";
import { launchCameraAsync } from "expo-image-picker";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { baseUrl } from "../../../constants/constants";

const ImagePicker = ({ userId ,picture}) => {
  const [image, setImage] = useState(picture);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    // Fetch the profile image when the component mounts
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`${baseUrl}/patients/${user._id}`);
        setImage(response.data.profileImage); // Adjust the path as needed based on your response structure
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, [user._id]);

















  const takeImageHandler = async () => {
    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", {
      uri,
      type: "image/jpeg",
      name: "profile.jpg",
    });
    formData.append("userId", userId);

    try {
      const response = await axios.post(
        `${baseUrl}/patients/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image upload response:", response.data);
      // Handle success (e.g., update state or show a message)
      setImage(response.data.profileImage); 
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error (e.g., show an error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={takeImageHandler}>
        <View style={styles.profileImageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Text>Select Image</Text>
          )}
        </View>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    borderRadius: 50, // Adjust radius for rounded corners
    overflow: "hidden",
    backgroundColor: "#eee", // Placeholder color
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
});
