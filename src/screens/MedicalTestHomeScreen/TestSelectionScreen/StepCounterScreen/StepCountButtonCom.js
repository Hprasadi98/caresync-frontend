import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import DisplayTime from "../../components/StopwatchDisplay";
import StepCountDataStore from "./StepCountDataStore";
import { Pedometer } from "expo-sensors";
import axios from "axios";
import CircularProgress from "react-native-circular-progress-indicator";
import { baseUrl } from "../../../../constants/constants";

const StepCountButton = () => {
  //run when loading the app
  useEffect(() => {
    testpedoAvailable();
    getResults();
  }, []);

  const padtoTwo = (number) => (number <= 9 ? `0${number}` : number);

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  let sDate = `${padtoTwo(date)}/${padtoTwo(month)}/${year}`;
  const [result, setResult] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const intervalRef = useRef(null);
  const [pedoAvailability, setpedoAvailability] = useState("");
  const [stepcount, setstepcount] = useState(0);

  //get distance using step count
  var dist = stepcount / 1300;
  var distance = dist.toFixed(4); //round off for 4 decimal places
  var cal = distance * 60;
  var calories = cal.toFixed(4);
  var updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const sTime = `${padtoTwo(updatedH)}:${padtoTwo(updatedM)}:${padtoTwo(
    updatedS
  )}`; //set time to 00:00:00 format

  const pID=212;

  //API integration for get results
  const getResults = () => {
    axios
      .get(`${baseUrl}/stepCounterTests`)
      .then((response) => {
        setResult(response.data || []);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  //API integration for post result
  const addResults = (data) => {
    const payload = {
      pID:pID,
      date: data.date,
      stopwatchTime: data.stopwatchTime,
      steps: data.steps,
      distance: data.distance,
      calories: data.calories,
    };
    axios
      .post(`${baseUrl}/stepCounterTests`, payload)
      .then(() => {
        getResults();
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  //API integration for delete all results
  const deleteResults = () => {
    axios
      .delete(`${baseUrl}/stepCounterTests`)
      .then(() => {
        getResults();
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  const deleteOneResult = (id) => {
    console.log(id);
    axios
      .delete(`${baseUrl}/stepCounterTests/${id}`)
      .then(() => {
        getResults();
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };


  const handleButtonClick = () => {
    if (isStarted) {
      clearInterval(intervalRef.current);
      addResults({
        date: sDate,
        stopwatchTime: sTime,
        steps: stepcount,
        distance: distance,
        calories:calories
      });
      resetTime();
      setstepcount(0);
      console.log("Stoped");
    } else {
      subscribe();
      intervalRef.current = setInterval(run, 1000); //get miliseconds in seconds
      console.log("Started");
    }
    setIsStarted(!isStarted);
  };

  //stopwatch senario
  const run = () => {
    if (updatedS === 60) {
      updatedS = 0;
      updatedM++;
    }
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    updatedS++;

    return setTime({ s: updatedS, m: updatedM, h: updatedH });
  };

  const resetTime = () => {
    setTime({ s: 0, m: 0, h: 0 });
  };

  //function to pedometer actions
  subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      setstepcount(result.steps);
    });
  };
  testpedoAvailable = () => {
    Pedometer.isAvailableAsync().then(
      (result) => {
        setpedoAvailability(String(result));
      },
      (error) => {
        setpedoAvailability(error);
      }
    );
  };
  //alert to confirmation delete table
  const showDecisionBox = () => {
    Alert.alert("Delete Details", "Do you want to delete your test result?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel deletion");
        },
      },
      {
        text: "Delete",
        onPress: () => {
          deleteResults();
          console.log("Delete Table");
        },
      },
    ]);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.pedotext}>
          Is Pedometer available on the device : {pedoAvailability}
        </Text>
        <DisplayTime time={time} />
        <View style={styles.testContainer}>
          <View>
            <CircularProgress
              value={stepcount}
              maxValue={6500}
              radius={70}
              activeStrokeColor={"#00567D"}
              inActiveStrokeColor={"#DEFFFB"}
              inActiveStrokeWidth={20}
              activeStrokeWidth={20}
              title={"Step Count"}
              titleStyle={{ fontWeight: "bold" }}
            />
          </View>
          <View style={styles.detailContainer}>
          <Text style={styles.testDetailTitle}>
                Target: 6500steps (5km)
              </Text>
            <View style={styles.disDetail}>
              <Text style={styles.testDetailTitles}>Distance</Text>
              <Text style={styles.testDetail}>{distance}</Text>
            </View>
            <View>
              <Text style={styles.testDetailTitles}>Calaries Burnt</Text>
              <Text style={styles.testDetail}>{calories}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, isStarted && styles.buttonClicked]}
          onPress={handleButtonClick}
        >
          <Text style={styles.buttonText}>{isStarted ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
        <View style={styles.table}>
          <StepCountDataStore sampleData={result} deleteOne={deleteOneResult}/>
        </View>
        <TouchableOpacity
          onPress={showDecisionBox}
          style={{ paddingBottom: 120 }}
        >
          <Text style={{ color: "#990000" }}>Reset Results</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  testContainer: {
    display: "flex",
    flexDirection: "row",
  },
  detailContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    paddingLeft: 10,
  },
  disDetail: {
    paddingBottom: 15,
  },
  testDetailTitle: {
    fontSize:15,
    color: "red",
    paddingBottom:10
  },
  testDetailTitles: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#00567D",
  },
  testDetail: {
    alignSelf: "center",
    fontSize: 15,
  },
  button: {
    padding: 35,
    width: 220,
    height: 100,
    backgroundColor: "#D5FFCA",
    borderRadius: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonClicked: {
    backgroundColor: "#FFCACA",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  table: {
    width: "100%",
  },
  pedotext: {
    backgroundColor: "#FFCACA",
    padding: 3,
    marginTop: 2,
    fontWeight: "bold",
  },
});
export default StepCountButton;
