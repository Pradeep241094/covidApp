import React, { Component } from "react";
// import Slider from "react-native-slider";
import { Button, Alert } from 'react-native';
import { Slider } from 'react-native-elements';
import { AppRegistry, StyleSheet, View, Text } from "react-native";
import { Card, Title } from 'react-native-paper';
import { SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

let customFonts = {
  'GoogleSans-Bold': require('../assets/fonts/GoogleSans-Bold.ttf'),
  'GoogleSans-Medium': require('../assets/fonts/GoogleSans-Medium.ttf'),
  'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
};

class Symptoms extends Component {
  constructor(props) {
    super(props)
  }
  token = undefined
  state = {
    patient_ID: '',
    updateDate: "2020-06-21T09:17:55.004Z",
    symptom: {
      feverOrChills: 1,
      cough: 1,
      headache: 1,
      shortnessOfBreath: 1,
      fatigue: 1,
      muscleOrBodyAches: 1,
      soreThroat: 1,
      lossOfTasteOrSmell: 1,
      congestionOrRunnyNose: 1,
      nauseaOrVomiting: 1,
      diarrhea: 1,
      symptomsAverage: 1
    }
  };


  async insertPatientData() {
    const token = await AsyncStorage.getItem('token')
    const { username } = this.props.route.params
    const patient_ID = username
    console.log('SYmtoms', token)
    console.log('symtopms', username)
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

    const data = {
      "patient_ID": username,
      "symptom": {
        "feverOrChills": feverOrChills,
        "cough": cough,
        "shortnessOfBreath": shortnessOfBreath,
        "fatigue": fatigue,
        "muscleOrBodyAches": muscleOrBodyAches,
        "headache": headache,
        "lossOfTasteOrSmell": lossOfTasteOrSmell,
        "soreThroat": soreThroat,
        "congestionOrRunnyNose": congestionOrRunnyNose,
        "nauseaOrVomiting": nauseaOrVomiting,
        "diarrhea": diarrhea,
        "symptomsAverage":  symptomsAverage
      }

     
    }

    fetch('https://mdfollowupcovidapi.azurewebsites.net/api/covid/Patient/InsertFollowUpData', {
      method: 'POST',
      // cors: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    }).then(response => JSON.stringify(response))
      .then(responseJson => {
        Alert.alert('Successfully Added!')
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async updatePatientData() {
    const token = await AsyncStorage.getItem('token')
    const { username } = this.props.route.params
    const patient_ID = username
    console.log('SYmtoms', token)
    console.log('symtopms', username)
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

    const data = {
      "patient_ID": username,
      "symptom": {
        "feverOrChills": feverOrChills,
        "cough": cough,
        "shortnessOfBreath": shortnessOfBreath,
        "fatigue": fatigue,
        "muscleOrBodyAches": muscleOrBodyAches,
        "headache": headache,
        "lossOfTasteOrSmell": lossOfTasteOrSmell,
        "soreThroat": soreThroat,
        "congestionOrRunnyNose": congestionOrRunnyNose,
        "nauseaOrVomiting": nauseaOrVomiting,
        "diarrhea": diarrhea,
        "symptomsAverage":  symptomsAverage
      }
    }

    fetch('https://mdfollowupcovidapi.azurewebsites.net/api/covid/Patient/UpdateFollowUpData', {
      method: 'PUT',
      // cors: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    }).then(response => JSON.stringify(response))
    .then(responseJson => {
      console.log(responseJson)
      Alert.alert('Successfully Updated!')
    })
    .catch((error) => {
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
          <Card style={{ marginLeft: 10 }}>
            <Title>Record Symptoms</Title>
            <Card >
              <Card.Content>
                <Slider
                  value={feverOrChills}
                  minimumValue={1}
                  maximumValue={5}
                  thumbTintColor={"#1DDCAF"}
                  step={1}
                  onValueChange={value => this.setState({ feverOrChills: value })}
                />
                <Text>
                  Fever: {feverOrChills}
                </Text>
                <Slider
                  value={cough}
                  minimumValue={1}
                  maximumValue={5}
                  thumbTintColor={"#1DDCAF"}
                  step={1}
                  onValueChange={value => this.setState({ cough: value })}
                />
                <Text>
                  Cough: {cough}
                </Text>
                <Slider
                  value={shortnessOfBreath}
                  minimumValue={1}
                  maximumValue={5}
                  thumbTintColor={"#1DDCAF"}
                  step={1}
                  onValueChange={value => this.setState({ shortnessOfBreath: value })}
                />
                <Text>
                  Shortness Of Breath: {shortnessOfBreath}
                </Text>
                <Slider
                  value={headache}
                  minimumValue={1}
                  maximumValue={5}
                  thumbTintColor={"#1DDCAF"}
                  step={1}
                  onValueChange={value => this.setState({ headache: value })}
                />
                <Text>
                  Headache: {headache}
                </Text>
                <Slider
                  value={muscleOrBodyAches}
                  minimumValue={1}
                  maximumValue={5}
                  thumbTintColor={"#1DDCAF"}
                  step={1}
                  onValueChange={value => this.setState({ muscleOrBodyAches: value })}
                />
                <Text>
                  Body Ache: {muscleOrBodyAches}
                </Text>
                <Slider
                  value={soreThroat}
                  minimumValue={1}
                  maximumValue={5}
                  thumbTintColor={"#1DDCAF"}
                  step={1}
                  onValueChange={value => this.setState({ soreThroat: value })}
                />
                <Text>
                  Sore Throat : {soreThroat}
                </Text>
                <Slider
                  value={lossOfTasteOrSmell}
                  minimumValue={1}
                  maximumValue={5}
                  thumbTintColor={"#1DDCAF"}
                  step={1}
                  onValueChange={value => this.setState({ lossOfTasteOrSmell: value })}
                />
                <Text>
                  Loss Of Taste Or Smell: {lossOfTasteOrSmell}
                </Text>
                <Slider
                  value={nauseaOrVomiting}
                  minimumValue={1}
                  maximumValue={5}
                  thumbTintColor={"#1DDCAF"}
                  step={1}
                  onValueChange={value => this.setState({ nauseaOrVomiting: value })}
                />
                <Text>
                  Nausea: {nauseaOrVomiting}
                </Text>
                <Slider
                  value={congestionOrRunnyNose}
                  minimumValue={1}
                  maximumValue={5}
                  thumbTintColor={"#1DDCAF"}
                  step={1}
                  onValueChange={value => this.setState({ congestionOrRunnyNose: value })}
                />
                <Text>
                  Congestion / RunnyNose: {congestionOrRunnyNose}
                </Text>
                <Slider
                  value={fatigue}
                  minimumValue={1}
                  maximumValue={5}
                  thumbTintColor={"#1DDCAF"}
                  step={1}
                  onValueChange={value => this.setState({ fatigue: value })}
                />
                <Text>
                  Fatigue: {fatigue}
                </Text>
                <Slider
                  value={diarrhea}
                  minimumValue={1}
                  maximumValue={5}
                  thumbTintColor={"#1DDCAF"}
                  step={1}
                  onValueChange={value => this.setState({ diarrhea: value })}
                />
                <Text>
                  Diarrhea: {diarrhea}
                </Text>
                <Slider
                  value={symptomsAverage}
                  minimumValue={1}
                  maximumValue={5}
                  thumbTintColor={"#1DDCAF"}
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
                color="#1DDCAF"
                onPress={() => this.insertPatientData()}
              />
              <Text>   </Text>
              <Button
                title="Update"
                color="#1DDCAF"
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