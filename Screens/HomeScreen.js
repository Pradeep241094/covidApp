import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { Icon, Image, Slider } from 'react-native-elements';
import Logo from '../assets/Logo.png';
import { Card,Title,Paragraph, Button } from 'react-native-paper';
import CardComponent from './CardComponent';
import * as Progress from 'react-native-progress';
import {SafeAreaView, ScrollView } from 'react-native';



class HomeScreen extends React.Component {
    state = {
        patient_ID: 123456,
        updateDate: "2020-06-21T09:17:55.004Z",
        userName: 'ABD123',
        symptoms: {
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
    
    // async componentDidMount() {
    //     this.setState({
    //       isLoading: true,
    //     }
    //     );
    
    //     try {
    //         this.getPatientData()
    //     } 
    //     catch (e) {
    //       console.log(e)
    //     } 
    //   }

    //   getPatientData () {
    //     const {patient_ID, updateDate, symptoms} = this.state;
    //     fetch('/api/covid/Patient/GetFollowUpData')
    //     .then(response => response.json())
    //     .then(responseJson => {
    //       this.setState(
    //         {
    //           isLoading: false,
    //           data: responseJson,
    //         },
    //         function() {}
    //       );
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     }); 
    //   }


    changeDateFormat (changeDate) {
        const newDate = Date(changeDate)
        console.log(newDate);
        return newDate;
    }

    render () {
        const {updateDate, symptoms} = this.state;
        return (
            <>
             <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
            <Card>
            <Card.Content>
              <Title>Recorded Symptoms</Title>
              <Paragraph>Updated Date: {this.changeDateFormat(updateDate)} </Paragraph>
            </Card.Content>

            <CardComponent
                title = 'Fever or Chills'
                value = {symptoms.feverOrChills}
            />
              <CardComponent
                title = 'Cough'
                value = {symptoms.cough}
            />
              <CardComponent
                title = 'Congestion / Runny Nose'
                value = {symptoms.congestionOrRunnyNose}
            />
              <CardComponent
                title = 'Headache'
                value = {symptoms.headache}
            />
              <CardComponent
                title = 'Nausea'
                value = {symptoms.nauseaOrVomiting}
            />
              <CardComponent
                title = 'Diarrhea'
                value = {symptoms.diarrhea}
            />
               <CardComponent
                title = 'Loss of Taste / Smell'
                value = {symptoms.lossOfTasteOrSmell}
            />
              <CardComponent
                title = 'Sore throat'
                value = {symptoms.soreThroat}
            />
              <CardComponent
                title = 'Fatigue'
                value = {symptoms.fatigue}
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
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
  });
export default HomeScreen;