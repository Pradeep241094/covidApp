import React from "react";
// import Slider from "react-native-slider";
import {  Button } from 'react-native';
import { Slider } from 'react-native-elements';
import { AppRegistry, StyleSheet, View, Text } from "react-native";
import { Card, Title } from 'react-native-paper';
import {SafeAreaView, ScrollView } from 'react-native';

let customFonts = {
    'GoogleSans-Bold': require('../assets/fonts/GoogleSans-Bold.ttf'),
    'GoogleSans-Medium': require('../assets/fonts/GoogleSans-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
};

class Symptoms extends React.Component {
  state = {
    patient_ID: undefined,
    updateDate: "2020-06-21T09:17:55.004Z",
    symptoms: {
      feverOrChills: 0,
      cough: 0,
      headache: 0,
      shortnessOfBreath: 0,
      fatigue: 0,
      muscleOrBodyAches: 0,
      soreThroat: 0,
      lossOfTasteOrSmell: 0,
      congestionOrRunnyNose: 0,
      nauseaOrVomiting: 0,
      diarrhea: 0,
      symptomsAverage: 0,
      isLoading: false,
    } 
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    }
    );

    try {
        this.insertPatientData()
        this.getPatientData()
        this.updatePatientData()
    } 
    catch (e) {
      console.log(e)
    } 
  }

  insertPatientData () {
      const {patient_ID, updateDate, symptoms} = this.state;

    fetch('/api/covid/Patient/InsertFollowUpData?token=tokenID', {
        method: 'POST',
        cors: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          patient_ID,
          updateDate,
          symptoms,
        ),
      }) .then(response => response.json())
      .then(responseJson => {
          this.setState({
              symptoms: responseJson,
              isLoading: false,
          })
      })
      .catch((error) => {
        this.setState({
          isLoading: false
        })
        console.error(error);
      });
  }

  getPatientData () {
    const {patient_ID, updateDate, symptoms} = this.state;
    fetch('/api/covid/Patient/GetFollowUpData')
    .then(response => response.json())
    .then(responseJson => {
      this.setState(
        {
          isLoading: false,
          data: responseJson,
        },
        function() {}
      );
    })
    .catch(error => {
      console.error(error);
    }); 
  }

  updatePatientData () {
    const {patient_ID, updateDate, symptoms} = this.state;

    fetch('/api/covid/Patient/InsertFollowUpData?token=tokenID', {
        method: 'PUT',
        cors: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          patient_ID,
          updateDate,
          symptoms,
        ),
      }) .then(response => response.json())
      .then(responseJson => {
          this.setState({
              symptoms: responseJson,
              isLoading: false,
          })
      })
      .catch((error) => {
        this.setState({
          isLoading: false
        })
        console.error(error);
      });
  }

  render() {
    const {
      feverOrChills,
      cough,
      headache,
      shortnessOfBreath,
      fatigue,
      muscleOrBodyAches,
      soreThroat,
      lossOfTasteOrSmell,
      congestionOrRunnyNose,
      nauseaOrVomiting,
      diarrhea,
      symptomsAverage,
    } = this.state;

    return (
      <SafeAreaView style={styles.boxcontainer}>
      <ScrollView>
      <Card style={{marginLeft: 10}}>
        <Title>Record Symptoms</Title>
        <Card >
          <Card.Content>
          <Slider
          value={feverOrChills}
          minimumValue={0}
          maximumValue={5}
          thumbTintColor={"blue"}
          step={1}
          onValueChange={value => this.setState({ feverOrChills: value })}
        />
        <Text>
          Fever: {feverOrChills}
        </Text>
        <Slider
          value={cough}
          minimumValue={0}
          maximumValue={5}
          thumbTintColor={"blue"}
          step={1}
          onValueChange={value => this.setState({ cough: value })}
        />
        <Text>
          Cough: {cough}
        </Text>
        <Slider
          value={shortnessOfBreath}
          minimumValue={0}
          maximumValue={5}
          thumbTintColor={"blue"}
          step={1}
          onValueChange={value => this.setState({ shortnessOfBreath: value })}
        />
        <Text>
        Shortness Of Breath: {shortnessOfBreath}
        </Text>
        <Slider
          value={headache}
          minimumValue={0}
          maximumValue={5}
          thumbTintColor={"blue"}
          step={1}
          onValueChange={value => this.setState({ headache: value })}
        />
        <Text>
          Headache: {headache}
        </Text>
        <Slider
          value={muscleOrBodyAches}
          minimumValue={0}
          maximumValue={5}
          thumbTintColor={"blue"}
          step={1}
          onValueChange={value => this.setState({ muscleOrBodyAches: value })}
        />
        <Text>
          Body Ache: {muscleOrBodyAches}
        </Text>
        <Slider
          value={soreThroat}
          minimumValue={0}
          maximumValue={5}
          thumbTintColor={"blue"}
          step={1}
          onValueChange={value => this.setState({ soreThroat: value })}
        />
        <Text>
          Sore Throat : {soreThroat}
        </Text>
        <Slider
          value={lossOfTasteOrSmell}
          minimumValue={0}
          maximumValue={5}
          thumbTintColor={"blue"}
          step={1}
          onValueChange={value => this.setState({ lossOfTasteOrSmell: value })}
        />
        <Text>
        Loss Of Taste Or Smell: {lossOfTasteOrSmell}
        </Text>
        <Slider
          value={nauseaOrVomiting}
          minimumValue={0}
          maximumValue={5}
          thumbTintColor={"blue"}
          step={1}
          onValueChange={value => this.setState({ nauseaOrVomiting: value })}
        />
        <Text>
        Nausea: {nauseaOrVomiting}
        </Text>
        <Slider
          value={congestionOrRunnyNose}
          minimumValue={0}
          maximumValue={5}
          thumbTintColor={"blue"}
          step={1}
          onValueChange={value => this.setState({ congestionOrRunnyNose: value })}
        />
        <Text>
        Congestion / RunnyNose: {congestionOrRunnyNose}
        </Text>
        <Slider
          value={fatigue}
          minimumValue={0}
          maximumValue={5}
          thumbTintColor={"blue"}
          step={1}
          onValueChange={value => this.setState({ fatigue: value })}
        />
        <Text>
        Fatigue: {fatigue}
        </Text>
        <Slider
          value={diarrhea}
          minimumValue={0}
          maximumValue={5}
          thumbTintColor={"blue"}
          step={1}
          onValueChange={value => this.setState({ diarrhea: value })}
        />
        <Text>
        Diarrhea: {diarrhea}
        </Text>
        <Slider
          value={symptomsAverage}
          minimumValue={0}
          maximumValue={5}
          thumbTintColor={"blue"}
          step={1}
          onValueChange={value => this.setState({ symptomsAverage: value })}
        />
        <Text>
        Overall Syptoms: {symptomsAverage}
        </Text>
          </Card.Content>
        
        </Card>
        <View style={styles.buttonContainer}>
        <Button
          title="Insert"
          color="#f194ff"
          onPress={() => this.insertPatientData()}
        />
        <Text>   </Text>
         <Button
          title="Update"
          color="blue"
          onPress={() => this.updatePatientData()}
        />
        </View>
      </Card>
      </ScrollView>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "stretch",
    justifyContent: "center"
  },
  layout: {
      marginLeft: 50,
      marginRight: 50,
      alignItems: "stretch",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10
  },
  marginContainer: {
    marginBottom: 10,
  },
  boxcontainer: {
    flex: 1,
    marginTop: 2,
  },
  text: {
    fontSize: 42,
  },
});

AppRegistry.registerComponent("Symptoms", () => Symptoms);

export default Symptoms;