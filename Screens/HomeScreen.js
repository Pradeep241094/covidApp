import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import Logo from '../assets/Logo.png';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import CardComponent from './CardComponent';
import { SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BarChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import { Avatar } from "react-native-elements";
import { color } from 'react-native-reanimated';

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
      updateDate: undefined,
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
    },
    stats: []
  };

  async componentDidMount() {
    var { username } = this.props.route.params;
    console.log(username)
    try {
      const token = await AsyncStorage.getItem('token')
      this.getPatientData(username, token)
      this.getStatistics(username, token)
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
    }).then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            patient_ID: responseJson.patient_ID,
            followUPDay: responseJson.followUPDay,
            followUpStartDate: responseJson.followUpStartDate,
            healthCondition: responseJson.healthCondition,
            symptoms: {
              updateDate: responseJson.symptomRecords.date,
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
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getStatistics(username, token) {

    const { stats } = this.state;
    const patient_ID = username;
    var url = `https://mdfollowupcovidapi.azurewebsites.net/api/covid/Patient/FollowUpData/AllDays?patient_ID=${patient_ID}`;
    fetch(url, {
      method: 'GET',
      // cors: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then(response => response.json())
      .then(responseJson => {
        const data = responseJson;
        this.setState({
          stats: data.symptomAverageRecords
        })
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

  logout () {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
  
  render() {
    const { updateDate, symptoms, stats, followUPDay,healthCondition  } = this.state;
    const fill = '#1DDCAF';
    const data = [1, 2, 3, 4, 5];
    const contentInset = { top: 20, bottom: 20 }
    const resultantStats = stats.map(statistics => {
      return statistics.symptomAverage;
    });

    const xaxisData = stats.map(statistics => {
      return statistics.followUPDay;
    });

    console.log(resultantStats);

    const { username } = this.props.route.params;
    const healthConditionUpdated = healthCondition
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Card style={{marginBottom: 10}}>
              <Card.Content style={{ backgroundColor: '#E8E8E8', marginBottom: 10, paddingBottom: 10}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                <Avatar
                  size="large"
                  overlayContainerStyle={{backgroundColor: 'white', color: 'black'}}
                  title={`DAY ${followUPDay}`}
                  titleStyle={{color: 'black', fontSize: 18, fontWeight: 'bold' }}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                />
                <View>
               
                <Title style={{marginLeft: 30, fontSize: 12}}>PATIENT ID: {username}</Title>
                <Title style={{marginLeft: 30, fontSize: 20, textTransform: 'uppercase'}}>{`Condition: ${healthCondition}`}</Title>
                </View>
               
                </View>
              </Card.Content>
              <Card.Content>
                <Title>Health Progress</Title>
                <View style={{ height: 200, flexDirection: 'row' }}>
                  <YAxis
                    data={data}
                    contentInset={contentInset}
                    svg={{
                      fill: 'grey',
                      fontSize: 10,
                    }}
                    numberOfTicks={10}
                  />
                  <BarChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={resultantStats.reverse()}
                    svg={{ fill }}
                    contentInset={contentInset}
                  >
                    <Grid />
                  </BarChart>
                </View>
                <XAxis
                  style={{ marginHorizontal: 15, marginTop: 5 }}
                  data={xaxisData}
                  formatLabel={(value, index) => index + 1}
                  contentInset={{ left: 10, right: 10 }}
                  svg={{ fontSize: 10, fill: 'black' }}
                />
                <Title>Recorded Symptoms</Title>
                <Paragraph>Date: {this.changeDateFormat(symptoms.updateDate)} </Paragraph>
                <Button
                  title="Go to Add Symptoms"
                  style={{ backgroundColor: '#1DDCAF' }}
                  color={'white'}
                  onPress={() => this.props.navigation.navigate('Symptoms', { username: this.state.patient_ID })}
                >Add Symptoms
                </Button>
              </Card.Content>

              <CardComponent
                title='Fever or Chills'
                value={this.state.symptoms.feverOrChills}
              />
              <CardComponent
                title='Cough'
                value={this.state.symptoms.cough}
              />
              <CardComponent
                title='Congestion / Runny Nose'
                value={this.state.symptoms.congestionOrRunnyNose}
              />
              <CardComponent
                title='Headache'
                value={this.state.symptoms.headache}
              />
              <CardComponent
                title='Nausea'
                value={this.state.symptoms.nauseaOrVomiting}
              />
              <CardComponent
                title='Diarrhea'
                value={this.state.symptoms.diarrhea}
              />
              <CardComponent
                title='Loss of Taste / Smell'
                value={this.state.symptoms.lossOfTasteOrSmell}
              />
              <CardComponent
                title='Sore throat'
                value={this.state.symptoms.soreThroat}
              />
              <CardComponent
                title='Fatigue'
                value={this.state.symptoms.fatigue}
              />
            </Card>
            <View style={{marginLeft: 10, marginRight: 10, marginBottom: 10}}>
              <Button
                  title="Logout"
                  style={{ backgroundColor: '#1DDCAF' }}
                  color={'white'}
                  onPress={() =>this.logout()}
                >Logout
                </Button>
              </View> 
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