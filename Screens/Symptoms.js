import React, { Component } from "react";
// import Slider from "react-native-slider";
import {  Button } from 'react-native';
import { Slider } from 'react-native-elements';
import { AppRegistry, StyleSheet, View, Text } from "react-native";
import { Card, Title } from 'react-native-paper';
import {SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

let customFonts = {
    'GoogleSans-Bold': require('../assets/fonts/GoogleSans-Bold.ttf'),
    'GoogleSans-Medium': require('../assets/fonts/GoogleSans-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
};

class Symptoms extends Component {
  constructor(props){
    super(props)
  }
  token=undefined

  state = {
    patient_ID: '',
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
        const {username} =this.props.route.params
        try {
            const token= await AsyncStorage.getItem('token')
            this.getPatientData(username,token)
            this.insertPatientData(username,token)
            this.getPatientData(username,token)
            this.updatePatientData(username,token)
        } 
        catch (e) {
          console.log(e)
        } 
  }
  
  insertPatientData () {
      const {patient_ID, updateDate, symptoms} = this.state;
      console.log(this.token_present)
      fetch('https://mdfollowupcovidapi.azurewebsites.net/api/covid/Patient/InsertFollowUpData', {
        method: 'POST',
        // cors: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(
          patient_ID,
          updateDate,
          symptoms,
        ),
      }) .then(response => console.log(JSON.stringify(response)))
      // .then(responseJson => {
      //   console.log('Data added')
      //     this.setState({
      //         symptoms: responseJson,
      //         isLoading: false,
      //     })
      // })
      .catch((error) => {
        this.setState({
          isLoading: false
        })
        console.error(error);
      });
  }

  getPatientData (username,token) {
    const patient_ID=username;
    var {updateDate, symptoms} = this.state;
    console.log('tully',token)
    var url=`https://mdfollowupcovidapi.azurewebsites.net/api/covid/Patient/FollowUpData/LastUpdated?patient_ID=${patient_ID}`;
    fetch(url,{
    method: 'GET',
    // cors: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  }).then(response => response.json())
    .then(responseJson => {
      console.log(responseJson)
      this.setState(
        {
          isLoading: false,
          data: responseJson,
        },
        function() {}
      );
    })
    .catch((error) => {
      console.error(error);
    });
  }

  updatePatientData (username,token) {
    const patient_ID = username
    const {updateDate, symptoms} = this.state;

    fetch('https://mdfollowupcovidapi.azurewebsites.net/api/covid/Patient/UpdateFollowUpData', {
        method: 'PUT',
        cors: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
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
          // onPress={() => this.updatePatientData()}
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