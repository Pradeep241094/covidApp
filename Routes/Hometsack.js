import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AuthScreen from '../Screens/AuthScene';
import Splashscreen from '../Screens/LoadingScene';


const Stack = createStackNavigator()

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen options={{headerShown: false}} name='Splash' component={Splashscreen} />
        <Stack.Screen options={{headerShown: false}} name='Auth' component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}