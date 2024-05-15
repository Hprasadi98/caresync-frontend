import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ToochableIconDown from '../../ViewPatientSummaryHome Screen/Components/TouchableIconDown';

function MedicalRecordGrid({
  recordName,
  date,
  recordDescription,
  incidents = [],
}) {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(100); // Initial height
  const heightAnim = useRef(new Animated.Value(100)).current;

  const calculateContentHeight = () => {
    const baseHeight = 105; // Base height without incidents
    const incidentHeight = incidents.length * 95; // Assuming each incident occupies 50 units of height
    return baseHeight + incidentHeight;
  };

  useEffect(() => {
    if (expanded) {
      const newHeight = calculateContentHeight();
      setContentHeight(newHeight);
      Animated.timing(heightAnim, {
        toValue: newHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      setContentHeight(100); // Reset to initial height
      Animated.timing(heightAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [expanded, incidents]);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const navigation = useNavigation();

  const handleAddNew = () => {
    navigation.navigate("MedicalIncidentHomeScreen", {
      recordName,
      recordDescription,
    });
  };

  return (
    <Animated.View
      style={[
        styles.tile,
        expanded && styles.expandedContainer,
        { height: heightAnim },
      ]}
    >
      <View style={styles.titleGrid}>
        <Text style={styles.title}>{recordName}</Text>
      </View>
      <View style={styles.icon}>
        <ToochableIconDown
          onPress={handlePress}
          iconName={expanded ? "up" : "down"}
          iconSize={30}
          iconColor="white"
        />
      </View>
      <View>
        <Text style={styles.description}>{recordDescription}</Text>
      </View>


      {expanded && (
        <View>
          {incidents.map((incident, index) => (
            <View key={index} style={styles.subtile}>
              <View style={styles.subcom}>
                <View style={styles.innertile}>
                  <Text style={styles.innertext}>{incident.incidentType}</Text>
                </View>

                <Text style={styles.subtext}>{incident.testType}</Text>
              </View>
              <Text style={styles.date}>{incident.date}</Text>

            </View>

          ))}
          <View style={styles.btn}>
            <Pressable style={styles.btn} onPress={handleAddNew}>
              <Text style={styles.btntext}>+ New Incident</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Animated.View>
  );
}

export default MedicalRecordGrid;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tile: {
    flex: 1,
    width: "90%",
    marginBottom: "2%",
    marginTop: "2%",
    marginLeft: "5%",
    marginRight: "5%",
    height: 110,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    textShadowRadius: 8,
  },

  btn: {
    backgroundColor: '#00567D',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 3,
    width: '90%',
    alignSelf: "center",





  },
  btntext: {
    color: "#FFF",
    fontSize: 14,
    margin: 2,
    fontWeight: "bold",
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 7,
    marginLeft: 25,
    color: "white",
  },
  description: {
    paddingLeft: 25,
    fontSize: 15,
    marginTop: 10,
  },

  id: {
    paddingLeft: 200,
    fontSize: 15,
    marginTop: -22,
  },
  icon: {
    paddingLeft: '88%',
    marginTop: -30,

  },

  subtile: {
    width: "90%",
    marginBottom: "2%",
    marginTop: "3%",
    marginLeft: "5%",
    marginRight: "5%",
    height: 60,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#FEFFE0",
    shadowColor: "black",
    shadowOpacity: 0.25,

    textShadowRadius: 8,
  },

  innertile: {
    width: "30%",
    marginBottom: "2%",
    marginTop: "2%",
    marginLeft: "3%",
    marginRight: "3%",
    height: 22,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#FFEBA5",
    shadowColor: "black",
    shadowOpacity: 0.25,
    textShadowRadius: 8,

  },

  innertext: {

    fontSize: 13,
    marginTop: 2,
    fontWeight: "bold",
    alignSelf: "center",
  },

  subtext: {
    paddingLeft: 2,
    marginRight: "3%",
    fontSize: 13,
    marginTop: "2%",
    fontWeight: "bold",
  },
  subcom: {
    flexDirection: "row",

  },
  subtext2: {
    paddingLeft: 10,
    marginRight: "3%",
    fontSize: 13,
    marginTop: "3%",
  },
  subtile3: {
    width: "90%",
    marginBottom: "2%",
    marginTop: "1%",
    marginLeft: "5%",
    marginRight: "5%",
    height: 60,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#E3FFE9",
    shadowColor: "black",
    shadowOpacity: 0.25,
    textShadowRadius: 8,
  },
  innertile3: {
    width: "35%",
    marginBottom: "2%",
    marginTop: "2%",
    marginLeft: "3%",
    marginRight: "3%",
    height: 22,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#94FFC5",
    shadowColor: "black",
    shadowOpacity: 0.25,
    textShadowRadius: 8,
  },

  date: {
    marginLeft: "8%",
    fontSize: 13,
    marginTop: "0.5%",
    fontWeight: "500"
  },
  presId: {
    marginLeft: "14%",
    fontSize: 13,
  },
  titleGrid: {
    width: "100%",
    backgroundColor: "#5c074b",
    marginTop: "4%",

    paddingBottom: "2%",
    borderRadius: 10,
  },
});
