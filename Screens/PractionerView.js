import * as React from 'react';
import { Card, DataTable } from 'react-native-paper';
import { ViewComponent, Button} from 'react-native';

import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class PractionerView extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    countOfStablePatients: 0,
    countOfImprovingPatients: 0,
    countOfDeterioratingPatients: 0,
    stable: [
      {
        patientID: "string",
        lastUpdateDate: "2020-06-27T22:43:09.523Z",
        healthCondition: "string"
      }
    ],
    improving: [
      {
        patientID: "string",
        lastUpdateDate: "2020-06-27T22:43:09.523Z",
        healthCondition: "string"
      }
    ],
    deteriorating: [
      {
        patientID: "string",
        lastUpdateDate: "2020-06-27T22:43:09.523Z",
        healthCondition: "string"
      }
    ]

  };
  async componentDidMount() {
    var { username } = this.props.route.params
    console.log(username)
    try {
      const token = await AsyncStorage.getItem('token')
      this.getpatientGroups(username, token)
    }
    catch (e) {
      console.log(e)
    }

  }



  getpatientGroups(username, token) {
    var { updateDate, symptoms } = this.state;
    fetch('https://mdfollowupcovidapi.azurewebsites.net/api/covid/MedicalProvider/GetPatientGroups', {
      method: 'GET',
      // cors: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then(response => response.json())
      .then(responseJson => {
        console.log('responseJson', responseJson)
        const data = responseJson;
        this.setState({
          countOfStablePatients: data.countOfStablePatients,
          countOfImprovingPatients: data.countOfImprovingPatients,
          countOfDeterioratingPatients: data.countOfDeterioratingPatients,
          stable: data.stable,
          improving: data.improving,
          deteriorating: data.deteriorating,
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  changeDateFormat(date) {
    var local = new Date(date).toISOString().slice(0,10);
    return local
}
  render() {
    const { countOfDeterioratingPatients, countOfImprovingPatients, countOfStablePatients, stable, deteriorating , improving} = this.state;

    console.log('stable', stable[0].healthCondition);
    return (
      <>
        <Card style={{ marginBottom: 5, paddingBottom: 0 }}>
          <Card.Title
            title="Health Condition: Deteriorating"
            subtitle={`Patients Suffering: ${countOfDeterioratingPatients}`}
            subtitleStyle={{ fontSize: 15, color: 'blue' }}
          />
          <Card.Content>
            <SafeAreaView style={{ height: 150 }}>
              <ScrollView>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Patient ID</DataTable.Title>
                    <DataTable.Title >Date</DataTable.Title>
                    <DataTable.Title>Action</DataTable.Title>
                  </DataTable.Header>
                 
                   
                    {deteriorating.map((patients) => (
                       <DataTable.Row>
                          {console.log('>>>>>>>>>>>>>>>>>>>>>>>patients', patients.patientID)}
                      <DataTable.Cell >{patients.patientID}</DataTable.Cell>
                    <DataTable.Cell>{this.changeDateFormat(patients.lastUpdateDate)}</DataTable.Cell>
                      <DataTable.Cell onPress={() => console.log('Pressed')}>
                        Click Here
                    </DataTable.Cell>
                     </DataTable.Row>
                    ))}
                </DataTable>
              </ScrollView>
            </SafeAreaView>
          </Card.Content>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <Card.Title
            title="Health Condition: Stable"
            subtitle={`Patients Suffering: ${countOfStablePatients}`}
            subtitleStyle={{ fontSize: 15, color: 'blue' }}
          />
          <Card.Content>
          <SafeAreaView style={{ height: 150 }}>
              <ScrollView>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Patient ID</DataTable.Title>
                <DataTable.Title >Date</DataTable.Title>
                <DataTable.Title>Action</DataTable.Title>
              </DataTable.Header>
              {stable.map((patients) => (
                       <DataTable.Row>
                          {console.log('>>>>>>>>>>>>>>>>>>>>>>>patients', patients.patientID)}
                      <DataTable.Cell >{patients.patientID}</DataTable.Cell>
                    <DataTable.Cell>{this.changeDateFormat(patients.lastUpdateDate)}</DataTable.Cell>
                      <DataTable.Cell onPress={() => console.log('Pressed')}>
                        Click Here
                    </DataTable.Cell>
                     </DataTable.Row>
                    ))}
            </DataTable>
            </ScrollView>
            </SafeAreaView>
          </Card.Content>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <Card.Title
            title="Health Condition: Improving"
            subtitle={`Patients Suffering: ${countOfImprovingPatients}`}
            subtitleStyle={{ fontSize: 15, color: 'blue' }}
          />
          <Card.Content>
          <SafeAreaView style={{ height: 150 }}>
              <ScrollView>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Patient ID</DataTable.Title>
                <DataTable.Title >Date</DataTable.Title>
                <DataTable.Title>Action</DataTable.Title>
              </DataTable.Header>
              {improving.map((patients) => (
                       <DataTable.Row>
                      <DataTable.Cell >{patients.patientID}</DataTable.Cell>
                    <DataTable.Cell>{this.changeDateFormat(patients.lastUpdateDate)}</DataTable.Cell>
                      <DataTable.Cell onPress={() => console.log('Pressed')}>
                        Click Here
                    </DataTable.Cell>
                     </DataTable.Row>
                    ))}
            </DataTable>
            </ScrollView>
            </SafeAreaView>
          </Card.Content>
        </Card>
        <Button
                  title="Create Patient"
                  style={{ backgroundColor: 'blue' }}
                  color={'blue'}
                  onPress={() => this.props.navigation.navigate('CreatePatient')}
        >Create Patient
        </Button>
      </>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: 42,
  },
});

export default PractionerView;