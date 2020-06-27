import * as React from 'react';
import { Card, DataTable } from 'react-native-paper';
import { View } from 'react-native';

import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

class PractionerView extends React.Component {
  state = {
    "countOfStablePatients": 0,
    "countOfImprovingPatients": 0,
    "countOfDeterioratingPatients": 0,
    "stable": [
      {
        "patientID": "string",
        "lastUpdateDate": "2020-06-27T22:43:09.523Z",
        "healthCondition": "string"
      }
    ],
    "improving": [
      {
        "patientID": "string",
        "lastUpdateDate": "2020-06-27T22:43:09.523Z",
        "healthCondition": "string"
      }
    ],
    "deteriorating": [
      {
        "patientID": "string",
        "lastUpdateDate": "2020-06-27T22:43:09.523Z",
        "healthCondition": "string"
      }
    ]

  }
  GetpatientGroups() {
      const patient_ID = username;
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

  render() {
    return (
      <>
        <Card style={{ marginBottom: 5, paddingBottom: 0 }}>
          <Card.Title
            title="Health Condition: Detoriating"
            subtitle="Number: 1267"
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
                  <DataTable.Row>
                    <DataTable.Cell>12344</DataTable.Cell>
                    <DataTable.Cell>'10-05-2020'</DataTable.Cell>
                    <DataTable.Cell onPress={() => console.log('Pressed')}>
                      Click Here
   </DataTable.Cell>
                  </DataTable.Row>

                  <DataTable.Row>
                    <DataTable.Cell>12344</DataTable.Cell>
                    <DataTable.Cell>10-21-2020</DataTable.Cell>
                    <DataTable.Cell onPress={() => console.log('Pressed')}>
                      Click Here
   </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>12344</DataTable.Cell>
                    <DataTable.Cell>10-21-2020</DataTable.Cell>
                    <DataTable.Cell onPress={() => console.log('Pressed')}>
                      Click Here
   </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>12344</DataTable.Cell>
                    <DataTable.Cell>10-21-2020</DataTable.Cell>
                    <DataTable.Cell onPress={() => console.log('Pressed')}>
                      Click Here
   </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>12344</DataTable.Cell>
                    <DataTable.Cell>10-21-2020</DataTable.Cell>
                    <DataTable.Cell onPress={() => console.log('Pressed')} style={{}}>
                      Click Here
   </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </ScrollView>
            </SafeAreaView>
          </Card.Content>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <Card.Title
            title="Health Condition: Detoriating"
            subtitle="Number: 1267"
          />
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Patient ID</DataTable.Title>
                <DataTable.Title >Date</DataTable.Title>
                <DataTable.Title>Action</DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell>12344</DataTable.Cell>
                <DataTable.Cell>'10-05-2020'</DataTable.Cell>
                <DataTable.Cell onPress={() => console.log('Pressed')}>
                  Click Here
   </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>12344</DataTable.Cell>
                <DataTable.Cell>10-21-2020</DataTable.Cell>
                <DataTable.Cell onPress={() => console.log('Pressed')}>
                  Click Here
   </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Card.Content>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <Card.Title
            title="Health Condition: Detoriating"
            subtitle="Number: 1267"
          />
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Patient ID</DataTable.Title>
                <DataTable.Title >Date</DataTable.Title>
                <DataTable.Title>Action</DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell>12344</DataTable.Cell>
                <DataTable.Cell>'10-05-2020'</DataTable.Cell>
                <DataTable.Cell onPress={() => console.log('Pressed')}>
                  Click Here
   </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>12344</DataTable.Cell>
                <DataTable.Cell>10-21-2020</DataTable.Cell>
                <DataTable.Cell onPress={() => console.log('Pressed')}>
                  Click Here
   </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Card.Content>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <Card.Title
            title="Health Condition: Detoriating"
            subtitle="Number: 1267"
          />
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Patient ID</DataTable.Title>
                <DataTable.Title >Date</DataTable.Title>
                <DataTable.Title>Action</DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell>12344</DataTable.Cell>
                <DataTable.Cell>'10-05-2020'</DataTable.Cell>
                <DataTable.Cell onPress={() => console.log('Pressed')}>
                  Click Here
   </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>12344</DataTable.Cell>
                <DataTable.Cell>10-21-2020</DataTable.Cell>
                <DataTable.Cell onPress={() => console.log('Pressed')}>
                  Click Here
   </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Pagination
                page={1}
                numberOfPages={3}
                onPageChange={page => {
                  console.log(page);
                }}
                label="1-2 of 6"
              />
            </DataTable>
          </Card.Content>
        </Card>
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