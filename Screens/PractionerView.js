import * as React from 'react';
import { Card, DataTable } from 'react-native-paper';
import { View, Button, TouchableOpacity,  Image, Alert } from 'react-native';
import {  Title, Paragraph } from 'react-native-paper';
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
    var { username } = this.props.route.params;

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
    var local = new Date(date).toISOString().slice(0, 10);
    return local
  }

  logout () {
    AsyncStorage.clear();
    this.props.navigation.navigate('PractionerAuth');
  }

  render() {
    const { countOfDeterioratingPatients, countOfImprovingPatients, countOfStablePatients, stable, deteriorating, improving } = this.state;
    const { username } = this.props.route.params;

    return (
      <>
      <View style={{marginRight: 10, marginLeft: 10}}>
      <ScrollView>
      <SafeAreaView>
        <Card style={{ marginBottom: 5, paddingBottom: 0 }}>
        <Card.Content>
          <Title style={{ marginBottom: 10}}>Provider ID: {username}</Title>
          <Button
          title="Create Patient"
          style={{ backgroundColor: '#1DDCAF', marginLeft: 10, marginRight: 10 }}
          color={'#1DDCAF'}
          onPress={() => this.props.navigation.navigate('CreatePatient')}
        >Create Patient
        </Button>
        </Card.Content>
          <Card.Title
            title="Health Condition: Deteriorating"
            subtitle={`Number of Patients: ${countOfDeterioratingPatients}`}
            subtitleStyle={{ fontSize: 15, color: '#1DDCAF' }}
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
                      <DataTable.Cell onPress={() => Alert.alert('Currently does not store personal information!')}>
                       Call Patient
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
            subtitle={`Number of Patients: ${countOfStablePatients}`}
            subtitleStyle={{ fontSize: 15, color: '#1DDCAF' }}
          />
          <Card.Content>
            <SafeAreaView style={{ height: 150 }}>
              <ScrollView>
                <View>
                  {
                    countOfStablePatients ?
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
                            <DataTable.Cell onPress={() => Alert.alert('Currently does not store personal information!')}>
                            Call Patient
                      </DataTable.Cell>
                          </DataTable.Row>
                        ))}
                      </DataTable> :
                      <DataTable>
                        <DataTable.Header>
                          <DataTable.Title>Patient ID</DataTable.Title>
                          <DataTable.Title >Date</DataTable.Title>
                          <DataTable.Title>Action</DataTable.Title>
                        </DataTable.Header>
                        <DataTable.Row>

                          <DataTable.Cell>No Data Available</DataTable.Cell>
                        </DataTable.Row>
                      </DataTable>
                  }
                </View>
              </ScrollView>
            </SafeAreaView>
          </Card.Content>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <Card.Title
            title="Health Condition: Improving"
            subtitle={`Number of Patients: ${countOfImprovingPatients}`}
            subtitleStyle={{ fontSize: 15, color: '#1DDCAF' }}
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
                      <DataTable.Cell onPress={() => Alert.alert('Currently does not store personal information!')}>
                      Call Patient
                    </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </ScrollView>
            </SafeAreaView>
          </Card.Content>
          <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => Alert.alert('Currently does not store personal information!')}
          style={styles.TouchableOpacityStyle}>
          <Image
            //We are making FAB using TouchableOpacity with an image
            //We are using online image here
            source={{
              uri:
              'https://imageog.flaticon.com/icons/png/512/0/532.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF',
            }}
            //You can use you project image Example below
            //source={require('./images/float-add-icon.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
        </Card>
        <View style={{marginLeft: 10, marginRight: 10}}>
        <Button
          title="Logout"
          style={{ backgroundColor: '#1DDCAF' }}
          color={'#1DDCAF'}
          onPress={() => this.logout()}
        >Logout
        </Button>
        </View>
        </SafeAreaView>
        </ScrollView>
        </View>
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
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
    marginTop: 50,
    //backgroundColor:'black'
  },
});

export default PractionerView;