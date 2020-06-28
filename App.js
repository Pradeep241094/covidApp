import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Navigator from './Routes/Hometsack';
import PractionerStack from './Routes/PractionerStack';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Stack = createStackNavigator();

function PatientView({navigation,route}) {
  if(route.name =='Patient view'){
    navigation.setOptions({tabBarVisible:true})
  }
  return <Navigator />;
}

function DoctorView({navigation}) {
  navigation.setOptions({tabBarVisible: false})
  return <PractionerStack />;
}

function HomeStackScreen({navigation,route}) {
  return (
    <HomeStack.Navigator name='Patient View'>
      <HomeStack.Screen
        name="Patient Login"
        component={PatientView}
      />
    </HomeStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Doctor Login"
        component={DoctorView}
      />
    </SettingsStack.Navigator>
  );
}
function HomeTabs({route}) {
  console.log(route.state)
  return (
    <Tab.Navigator>
       <Tab.Screen name="Patient Login"  component={HomeStackScreen} />
        <Tab.Screen name="Doctor Login" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeTabs} />
    </Stack.Navigator>
    </NavigationContainer>
   
  );
}

