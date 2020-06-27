import * as React from 'react';
import { Button, Text, View, AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import PractionerView from './Screens/PractionerView';
import HomeScreen from './Screens/HomeScreen';
import Symptoms from './Screens/Symptoms';
import { render } from 'react-dom';
import AuthScene from './Screens/AuthScene';
// import Splashscreen from './Screens/LoadingScene';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
 return (
   <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} />  
    <HomeStack.Screen name="Symtoms" component={Symptoms} />           
   </HomeStack.Navigator>
  );
}
const SymptomsStack = createStackNavigator();

function SymptomsStackScreen() {
  return (
    <SymptomsStack.Navigator>
      <SymptomsStack.Screen name="Symptoms" component={Symptoms} />
      <SymptomsStack.Screen name="Home" component={HomeScreen} />
    </SymptomsStack.Navigator>
  );
}
const Tab = createBottomTabNavigator();


class App extends React.Component {

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

  render () {

    const {isSignedUp} = this.state;
    console.log("isSignedUp>>>>>>>>>>>>>>", isSignedUp);
    return (
      <>
       {this.state.isSignedUp ?
       <>
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
              iconName = focused
              ? 'ios-list-box'
              : 'ios-list';
            }
      
       return <Ionicons name={iconName} size={size} color={color}     />;
         },
      })}
  tabBarOptions={{
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
      }}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Symptoms" component= {SymptomsStackScreen} />
        </Tab.Navigator>
      </NavigationContainer> 
      </>
      :
      <>
       <AuthScene />
    </>
    }
      </>
    );
  }
  }

export default App;