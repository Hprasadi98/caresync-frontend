import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { launchImageLibraryAsync, launchCameraAsync } from "expo-image-picker";
import api from "../../../Services/AuthService";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { baseUrl } from "../../../constants/constants";

const ImagePickerDoctor = ({ userId, picture }) => {
  const [image, setImage] = useState(picture);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true); // New state for loading user
  const { user } = useAuthContext();

  useEffect(() => {
    // Fetch the profile image when the component mounts, only if user is available
    const fetchProfileImage = async () => {
      if (user && user._id) {
        try {
          const response = await api.get(`${baseUrl}/doctors/${user._id}`);
          setImage(response.data.profileImage); // Adjust the path as needed based on your response structure
        } catch (error) {
          console.error("Error fetching profile image:", error);
        } finally {
          setUserLoading(false);
        }
      } else {
        setUserLoading(false);
      }
    };

    fetchProfileImage();
  }, []);

  const takeImageHandler = async () => {
    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled) {
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
      const response = await api.post(
        `${baseUrl}/doctors/${user._id}`,
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

  if (userLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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

export default ImagePickerDoctor;

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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
