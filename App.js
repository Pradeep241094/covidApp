import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Navigator from './Routes/Hometsack';
import PractionerStack from './Routes/PractionerStack';
import Header from './Screens/Header';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Stack = createStackNavigator();

function PatientView() {
  return <Navigator/>;
}

function DoctorView() {

  return <PractionerStack />;
}

function HomeStackScreen({navigation, route}) {
  console.log('navigation>>>>>>>>>>>>', route.state)
  if (route.state && route.state.index > 1) {
    navigation.setOptions({tabBarVisible : false})
  } else {
    navigation.setOptions({tabBarVisible : true})
  }
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }} initialRouteName="Patient Login">
      <HomeStack.Screen
        name="Patient Login"
        component={PatientView}
        screenOptions={{
          headerShown: false
        }}
      />
    </HomeStack.Navigator>
  );
}

function SettingsStackScreen({navigation, route}) {
   if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible : true})
  } else {
    navigation.setOptions({tabBarVisible : false})
  }
  return (
    <SettingsStack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >
      <SettingsStack.Screen
        name="Doctor Login"
        component={DoctorView}
      />
    </SettingsStack.Navigator>
  );
}
export default function App() {
  return (
    <>
    <Header />
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Patient Login"  component={HomeStackScreen} />
      <Tab.Screen name="Doctor Login" component={SettingsStackScreen} />
    </Tab.Navigator>
    </NavigationContainer>
    </>
  );
}

