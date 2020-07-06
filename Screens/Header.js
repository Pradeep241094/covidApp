import * as React from 'react';
import { Avatar, Appbar } from 'react-native-paper';
import {Image } from 'react-native';

export default class Header extends React.Component {

  render() {
    return (
      <Appbar.Header
      theme={{ colors: { primary: '#1DDCAF' } }}
      ><Image
      source={require('../assets/Logo.png')}
      style={{
        marginLeft: 10,
        width: 150,
        height: 50,
      }}
    />
      </Appbar.Header>
    );
  }
}