import React, { Component } from "react";
// import Slider from "react-native-slider";
import { Alert } from 'react-native';
import { Slider } from 'react-native-elements';
import { AppRegistry, StyleSheet, View, Text } from "react-native";
import { Button, Card, Title } from 'react-native-paper';
import { SafeAreaView, ScrollView } from 'react-native';
import { AppLoading } from 'expo';
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
  static route = {
    styles: {
      gestures: null,
    },
  };
  token = undefined
  olddate = new Date()
  state = {
    dateloaded:false,
    patient_ID: '',
    updateDate: new Date(1980,10,10),
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

  async componentDidMount() {
    this.getP
    this.olddatedate = new Date(this.olddate.getFullYear() + '-' + (this.olddate.getMonth() + 1) + '-' + this.olddate.getDate());
    var { username } = this.props.route.params;
    console.log(username)
    try {
      const token = await AsyncStorage.getItem('token')
      await this.getPatientData(username, token)
      
    }
    catch (e) {
      console.log(e)
    }
  }

 async getPatientData(username, token) {
    const patient_ID = username;
    var { updateDate, symptoms } = this.state;
    var url = `https://mdfollowupcovidapi.azurewebsites.net/api/covid/Patient/FollowUpData/LastUpdated?patient_ID=${patient_ID}`;
    fetch(url, {
      method: 'GET',
      // cors: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then(response => response.json())
      .then(responseJson => {

        this.setState(
          {
            updateDate: new Date(responseJson.symptomRecords.date),
            dateloaded:true,
            symptoms: {
              feverOrChills: responseJson.symptomRecords.symptoms.feverOrChills,
              cough: responseJson.symptomRecords.symptoms.cough,
              headache: responseJson.symptomRecords.symptoms.headache,
              shortnessOfBreath: responseJson.symptomRecords.symptoms.shortnessOfBreath,
              fatigue: responseJson.symptomRecords.symptoms.fatigue,
              muscleOrBodyAches: responseJson.symptomRecords.symptoms.muscleOrBodyAches,
              soreThroat: responseJson.symptomRecords.symptoms.soreThroat,
              lossOfTasteOrSmell: responseJson.symptomRecords.symptoms.lossOfTasteOrSmell,
              congestionOrRunnyNose: responseJson.symptomRecords.symptoms.congestionOrRunnyNose,
              nauseaOrVomiting: responseJson.symptomRecords.symptoms.nauseaOrVomiting,
              diarrhea: responseJson.symptomRecords.symptoms.diarrhea,
              symptomsAverage: responseJson.symptomRecords.symptoms.symptomsAverage,
            }

          });
        // console.log(Date.parse(this.newdate) < Date.parse(this.olddate))
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
      updateDate,
    } = this.state;

    console.log('>>>>>updateDate>>>>>>>>>>',updateDate)

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
        "symptomsAverage": symptomsAverage
      }


    }

    console.log('>>>>>>>>>>>>>>>>>>data', data);

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
        "symptomsAverage": symptomsAverage
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
    }).then(response =>   JSON.stringify(response))
      .then(responseJson => {
        console.log(responseJson)
        Alert.alert('Successfully Updated!')
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.dateloaded) {
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
      updateDate
    } = this.state.symptoms;


    console.log('symptoms', this.state.symptoms);

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
              {Date.parse((this.state.updateDate).toDateString() + 1) < Date.parse((this.olddate).toDateString())
                  ? <Button
                    title="Insert"
                    style={{ backgroundColor: '#1DDCAF' }}
                    color={'white'}
                    contentStyle={{ with: 50 }}
                    onPress={() => this.insertPatientData()}
                  >Insert</Button>
                  : <Button
                    title="Update"
                    color={'white'}
                    style={{ backgroundColor: '#1DDCAF' }}
                    onPress={() => this.updatePatientData()}
                  >Update</Button>

              }
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return <AppLoading />;
}
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
    flex: 1,
    justifyContent: 'space-evenly',
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