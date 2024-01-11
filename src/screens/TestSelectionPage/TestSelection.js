import { View } from "react-native";
import TestHeader from "../../components/Header";
import StepCounterSelection from "./StepCounterSelection";
import BreatingTestSelection from "./BreatingTestSelection";


const TestSelection =({navigation})=>{
    return(
        <View>
        <TestHeader name="Medical Test"/>
        <StepCounterSelection navigation={navigation}/>
        <BreatingTestSelection navigation={navigation}/>
        </View>
    )
};

export default TestSelection;