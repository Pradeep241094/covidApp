import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home screen</Text>
        <Button
          title="Add Symptoms"
          color= "blue"
          onPress={() => navigation.navigate('Symptoms')}
        />
      </View>
    );
  }