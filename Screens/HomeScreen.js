import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { Icon, Image, Slider } from 'react-native-elements';
import Logo from '../assets/Logo.png';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import CardComponent from './CardComponent';
import * as Progress from 'react-native-progress';
import { SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';



class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    patient_ID: '',
    followUPDay: undefined,
    followUpStartDate: undefined,
    healthCondition: undefined,
    symptoms: {
      updateDate:undefined,
      feverOrChills: 1,
      cough: 5,
      headache: 3,
      shortnessOfBreath: 2,
      fatigue: 0,
      muscleOrBodyAches: 1,
      soreThroat: 1,
      lossOfTasteOrSmell: 3,
      congestionOrRunnyNose: 1,
      nauseaOrVomiting: 4,
      diarrhea: 0,
      symptomsAverage: 3,
      isLoading: false,
    }
  };

  async componentDidMount() {
    var { username } = this.props.route.params
    console.log(username)
    try {
      const token = await AsyncStorage.getItem('token')
      this.getPatientData(username, token)
    }
    catch (e) {
      console.log(e)
    }

  }

  getPatientData(username, token) {
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
    }).then( response => response.json())
      .then ( responseJson => {
          this.setState(
          {
            patient_ID: responseJson.patient_ID,
            followUPDay: responseJson.followUPDay,
            followUpStartDate: responseJson.followUpStartDate,
            healthCondition: responseJson.healthCondition,
            symptoms:{
              updateDate:responseJson.symptomRecords.date,
              feverOrChills:responseJson.symptomRecords.symptoms.feverOrChills,
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
      })
      .catch((error) => {
        console.error(error);
      });
  }


  changeDateFormat(changeDate) {
    const newDate = Date(changeDate)
    console.log(newDate);
    return newDate;
  }

  render() {
    const { updateDate, symptoms } = this.state;
    console.log(this.state)
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Card>
              <Card.Content>
                <Title>Recorded Symptoms</Title>
                <Paragraph>Updated Date: {this.changeDateFormat(symptoms.updateDate)} </Paragraph>
              </Card.Content>

              <CardComponent
                title='Fever or Chills'
                value={this.state.symptoms.feverOrChills}
              />
              <CardComponent
                title='Cough'
                value={symptoms.cough}
              />
              <CardComponent
                title='Congestion / Runny Nose'
                value={symptoms.congestionOrRunnyNose}
              />
              <CardComponent
                title='Headache'
                value={symptoms.headache}
              />
              <CardComponent
                title='Nausea'
                value={symptoms.nauseaOrVomiting}
              />
              <CardComponent
                title='Diarrhea'
                value={symptoms.diarrhea}
              />
              <CardComponent
                title='Loss of Taste / Smell'
                value={symptoms.lossOfTasteOrSmell}
              />
              <CardComponent
                title='Sore throat'
                value={symptoms.soreThroat}
              />
              <CardComponent
                title='Fatigue'
                value={symptoms.fatigue}
              />
            </Card>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
}

AppRegistry.registerComponent("HomeScreen", () => HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: 42,
  },
});
export default HomeScreen;