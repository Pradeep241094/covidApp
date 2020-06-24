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

const Stack = createStackNavigator()

const Tab = createBottomTabNavigator()

function TabNavigator () {
return (
  <NavigationContainer>
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
        } else if (route.name === 'Symptoms') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
   tabBarOptions={{
    activeTintColor: 'blue',
    inactiveTintColor: 'gray',
  }}
  >
    <Tab.Screen name="Home" component={HomeScreen}  style= {{fontSize: 20, }}/>
    <Tab.Screen name="Symptoms" component={Symptoms} />
  </Tab.Navigator>
</NavigationContainer>
)
} 

class Navigator extends React.Component {
  state = {
    isSignedUp : true,
  }

  render() {
    return (
      <>
      {this.state.isSignedUp ?
      <>
      <Header/>
      <TabNavigator /> 
      </>
      :
      <>
        <Header/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash'>
          <Stack.Screen 
          
          options={{headerShown: false}} name='Splash' component={Splashscreen} />
          <Stack.Screen options={{headerShown: false}} name='Auth' component={AuthScreen} />
          <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
          <Stack.Screen options={{headerShown: false}} name="Record Symptoms" component={Symptoms} />
        </Stack.Navigator>
      </NavigationContainer>
      </>
      }
      </>
    );
  }
}

AppRegistry.registerComponent("Navigator", () => Navigator);

export default Navigator;