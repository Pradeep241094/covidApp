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

const FeedStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen options={{headerShown: false}} name='Splash' component={Splashscreen} />
      <FeedStack.Screen options={{headerShown: false}} name='Auth' component={AuthScreen} />
      <FeedStack.Screen name="Home" component={HomeScreen} />
      <FeedStack.Screen name="Symptoms" component={Symptoms} />
      {/* other screens */}
    </FeedStack.Navigator>
  );
}

const HomeStackNav = createStackNavigator();

function SymptomsScreen() {
  return (
    <HomeStackNav.Navigator>
      {/* {/* <HomeStachNav.Screen options={{headerShown: false}} name='Splash' component={Splashscreen} />
      <HomeStachNav.Screen options={{headerShown: false}} name='Auth' component={AuthScreen} /> *} */}
      <HomeStackNav.Screen  options={{headerShown: false}} name="Symptoms" component={Symptoms} />
      <HomeStackNav.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
      {/* other screens */}
    </HomeStackNav.Navigator>
  );
}


function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Symptoms" component={SymptomsScreen} />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();

const Stack = createStackNavigator()

const Tab = createBottomTabNavigator()

// function TabNavigator () {
// return (
//   <NavigationContainer>
//   <Tab.Navigator
//     screenOptions={({ route }) => ({
//       tabBarIcon: ({ focused, color, size }) => {
//         let iconName;
//         if (route.name === 'Home') {
//           iconName = focused
//             ? 'ios-information-circle'
//             : 'ios-information-circle-outline';
//         } else if (route.name === 'Symptoms') {
//           iconName = focused ? 'ios-list-box' : 'ios-list';
//         }

//         return <Ionicons name={iconName} size={size} color={color} />;
//       },
//     })}
//    tabBarOptions={{
//     activeTintColor: 'blue',
//     inactiveTintColor: 'gray',
//   }}
//   >
//     <Tab.Screen name="Home" component={HomeScreen}  style= {{fontSize: 20, }}/>
//     <Tab.Screen name="Symptoms" component={Symptoms} />
//     <Tab.Screen name="PractionerView" component={PractionerView} />
//   </Tab.Navigator>
// </NavigationContainer>
// )
// } 

class Navigator extends React.Component {
  state={
    isSignedUp: false
  }
  
  componentDidMount(){
    this.getData()
  }

async getData () {
  await AsyncStorage.clear()
  const value = await AsyncStorage.getItem('token')
    if(value !== null) {
      this.setState({ isSignedUp:true })
    }
    else { 
      this.setState({ isSignedUp:false })
    }
}

  render() {
    return (
      <>
      <NavigationContainer>
      {this.state.isSignedUp ?
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={HomeTabs} />
      </RootStack.Navigator>
      :
      <RootStack.Navigator>
      <RootStack.Screen name="Home" component={HomeTabs} />
      </RootStack.Navigator> }
    </NavigationContainer>
      </>
    );
  }
}

AppRegistry.registerComponent("Navigator", () => Navigator);

export default Navigator;