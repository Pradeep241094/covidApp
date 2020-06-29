import * as React from 'react';
import { Avatar, Appbar } from 'react-native-paper';

export default class Header extends React.Component {

  render() {
    return (
      <Appbar.Header
      theme={{ colors: { primary: '#1DDCAF' } }}
      >
         <Avatar.Image 
         size={48} 
         style ={{marginLeft: 10, backgroundColor: 'white'}}
         source={require('../assets/Logo.png')} />
         <Appbar.Content title="Covid-19 MD Patient Follow up"  />
      </Appbar.Header>
    );
  }
}