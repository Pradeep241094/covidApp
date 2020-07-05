import * as React from 'react';
import { Card, DataTable } from 'react-native-paper';
import { View, TouchableOpacity, Image, Alert } from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as FileSystem from 'expo-file-system';
import Table from './DataTable';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { Icon } from 'react-native-elements'



class PractionerView extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    downloadProgress: 0,
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

  callback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    this.setState({
      downloadProgress: progress,
    });
  };

  downloadFile() {
    console.log('Hello, >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.')
    const uri = "https://certficates-pradeep.s3.amazonaws.com/CertificateOfCompletion_Learning+REST+APIs.pdf"
    let fileUri = FileSystem.documentDirectory + "cretificate.pdf";
    FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => {
        this.saveFile(uri);
        this.callback
      })
      .catch(error => {
        console.error(error);
      })
  }

  saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log('status>>>>>>>>>>>>>>>>>>', status);
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri)
      await MediaLibrary.createAlbumAsync("Download", asset, false)
      Alert.alert('Saved to Downloads Folder')
      this.callback
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

  logout() {
    AsyncStorage.clear();
    this.props.navigation.navigate('PractionerAuth');
  }

  render() {
    const { countOfDeterioratingPatients, countOfImprovingPatients, countOfStablePatients, stable, deteriorating, improving } = this.state;
    const { username } = this.props.route.params;

    return (
      <>
        <View style={{ marginRight: 10, marginLeft: 10 }}>
          <ScrollView style={{ marginBottom: 10 }}>
            <SafeAreaView>
              <Card style={{ marginBottom: 5, paddingBottom: 0 }}>
                <Card.Content>
                  <View style={{display: 'flex',marginTop: -15, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Title style={{marginTop: 20}}>Provider ID: {username}</Title>
                  <Icon
                  raised
                  name='download'
                  type='font-awesome'
                  color='black'
                  onPress={() => this.downloadFile()} />
                  </View>
                  <Button
                    title="Create Patient"
                    style={{ backgroundColor: '#1DDCAF', marginLeft: 10, marginRight: 10 }}
                    color={'white'}
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
                  <Table data={deteriorating} />
                </Card.Content>
              </Card>
              <Card style={{ marginBottom: 10 }}>
                <Card.Title
                  title="Health Condition: Stable"
                  subtitle={`Number of Patients: ${countOfStablePatients}`}
                  subtitleStyle={{ fontSize: 15, color: '#1DDCAF' }}
                />
                <Card.Content>
                  <Table data={stable} />
                </Card.Content>
              </Card>
              <Card style={{ marginBottom: 10, paddingBottom: 10 }}>
                <Card.Title
                  title="Health Condition: Improving"
                  subtitle={`Number of Patients: ${countOfImprovingPatients}`}
                  subtitleStyle={{ fontSize: 15, color: '#1DDCAF' }}
                />
                <Card.Content>
                  <Table data={improving} />
                </Card.Content>
              </Card>
              <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                <Button
                  title="Logout"
                  style={{ backgroundColor: '#1DDCAF' }}
                  color={'white'}
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
    marginTop: 100,
    //backgroundColor:'black'
  },
});

export default PractionerView;