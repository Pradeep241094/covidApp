import * as React from 'react';
import { Avatar, Appbar, Button } from 'react-native-paper';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
export default class Header extends React.Component {
  constructor(props){
    super(props)
  }
  state={
    isloggedin: true,
    token,
  }
  
  logout(){
    this.Asyncstorage.clear()
    this.setState({ isloggedin:false})
  }
 
async componentDidMount(){
  
  const token= await Asyncstorage.getItem('token');
}
  render() {

const {token} = this.state;
    return (
      <Appbar.Header
        theme={{ colors: { primary: '#1DDCAF' } }}
      >
        <Avatar.Image
          size={48}
          style={{ marginLeft: 10, backgroundColor: 'white' }}
          source={require('../assets/icon.png')} />
        <Appbar.Content title="Patient Follow up" />
        {token !== null ?
          <Button color={'black'} onPress={this.logout()}>
          Logout
        </Button> : <> </>
        }
      </Appbar.Header>
    );
  }
}