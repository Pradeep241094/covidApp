import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthScreen from '../Screens/AuthScene';
import Splashscreen from '../Screens/LoadingScene';
import HomeScreen from '../Screens/HomeScreen';
import Symptoms from '../Screens/Symptoms';
import Header from '../Screens/Header';
import { AppRegistry } from "react-native";
import PractionerView from '../Screens/PractionerView';
import AsyncStorage from '@react-native-community/async-storage';
const Stack = createStackNavigator();
class Navigator extends React.Component {
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
    const {navigtionProp} = this.props;
    const {  isSignedUp } = this.state;

    return (
      <>
            <>
            <NavigationContainer independent={true} tabBarVisible={navigtionProp} >
            <Stack.Navigator>
            {
          isSignedUp ?
            <>
              <Stack.Screen  name="Home" component={HomeScreen} />
              <Stack.Screen name="Symptoms" component={Symptoms} />
              </>
              :
              <>
              <Stack.Screen name="Splash" component={Splashscreen} />
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Symptoms" component={Symptoms} />
              </>}
            </Stack.Navigator>
            </NavigationContainer>
            </>
      </>
    );
  }
}
AppRegistry.registerComponent("Navigator", () => Navigator);
export default Navigator;