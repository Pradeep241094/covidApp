import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PractionerAuth from '../Screens/Practioner_authscreen';
import Splashscreen from '../Screens/LoadingScene';
import HomeScreen from '../Screens/HomeScreen';
import Symptoms from '../Screens/Symptoms';
import Header from '../Screens/Header';
import { AppRegistry } from "react-native";
import PractionerView from '../Screens/PractionerView';
import AsyncStorage from '@react-native-community/async-storage';
const Stack = createStackNavigator();
class PractionerStack extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    isSignedUp: false,
    tokenPresent: false,
  }
  componentDidMount() {
    this.getData()
  }
  async getData() {
    await AsyncStorage.clear()
    const value = await AsyncStorage.getItem('token')
    if (value !== null) {
      this.setState({ isSignedUp: true, tokenPresent: true })
    }
    else {
      this.setState({ isSignedUp: false, tokenPresent: false })
    }
  }

  render() {
    const {  isSignedUp } = this.state;

    return (
      <>
            <>
            <NavigationContainer independent={true}>
            <Stack.Navigator>
            {
          isSignedUp ?
            <>
              <Stack.Screen name="PractionerView" component={PractionerView} />
              <Stack.Screen name="CreatePatient" component={Symptoms} />
              </>
              :
              <>
              {/* <Stack.Screen name="Splash" component={Splashscreen} /> */}
              <Stack.Screen name="PractionerAuth" component={PractionerAuth} />
              <Stack.Screen name="PractionerView" component={PractionerView} />
              <Stack.Screen name="CreatePatient" component={Symptoms} />
              </>}
            </Stack.Navigator>
            </NavigationContainer>
            </>
      </>
    );
  }
}
AppRegistry.registerComponent("PractionerStack", () => PractionerStack);
export default PractionerStack;