import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const DetailRow = ({name,textLineOne,textLineTwo}) => {
  return (
    <View style={styles.container}>
        
      <View style={styles.iconContainer}>
      <Icon name={name} size={30} color="black" />
      </View>

      <View style={styles.textcontainer}>
        <Text style={styles.textLineOne}>{textLineOne}</Text>
        <Text style={styles.textLineTwo}>{textLineTwo}</Text>
        <View style={styles.horizontalLine} />
      </View>
    </View>
  );
};

export default DetailRow;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    marginLeft: 30,
  },
  textcontainer: {
    flexDirection: "column",

    marginLeft: 40,
  },
  iconContainer:
  {
    marginTop: 8,
  },
  textLineOne:{
    fontSize: 16,
    color:"grey"
  },
  textLineTwo:{
    fontSize: 16,
    color:"black"
  },
  horizontalLine: {
    borderBottomWidth: 1, // Change the width as needed
    borderBottomColor: '#ccc', // Change the color as needed
    marginVertical: 15, // Adjust vertical spacing as needed
    width: 230,
   
  },
});
