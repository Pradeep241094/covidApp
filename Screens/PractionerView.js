import * as React from 'react';
import { Card, DataTable} from 'react-native-paper';
import {View} from 'react-native';

import {SafeAreaView, ScrollView, StyleSheet } from 'react-native';

class PractionerView extends React.Component{
    state = {
        
    }
    render() {
        return (
            <>
            <Card style={{marginBottom: 5, paddingBottom: 0}}>
            <Card.Title
            title="Health Condition: Detoriating"
            subtitle="Number: 1267"
            />
             <Card.Content>
             <SafeAreaView style={{height: 150}}>
      <ScrollView>
    <DataTable>
    <DataTable.Header>
      <DataTable.Title>Patient ID</DataTable.Title>
      <DataTable.Title >Date</DataTable.Title>
      <DataTable.Title>Action</DataTable.Title>
    </DataTable.Header>
    <DataTable.Row>
      <DataTable.Cell>12344</DataTable.Cell>
      <DataTable.Cell>'10-05-2020'</DataTable.Cell>
      <DataTable.Cell onPress={() => console.log('Pressed')}>
Click Here
   </DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>12344</DataTable.Cell>
      <DataTable.Cell>10-21-2020</DataTable.Cell>
      <DataTable.Cell onPress={() => console.log('Pressed')}>
Click Here
   </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
      <DataTable.Cell>12344</DataTable.Cell>
      <DataTable.Cell>10-21-2020</DataTable.Cell>
      <DataTable.Cell onPress={() => console.log('Pressed')}>
Click Here
   </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
      <DataTable.Cell>12344</DataTable.Cell>
      <DataTable.Cell>10-21-2020</DataTable.Cell>
      <DataTable.Cell onPress={() => console.log('Pressed')}>
Click Here
   </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
      <DataTable.Cell>12344</DataTable.Cell>
      <DataTable.Cell>10-21-2020</DataTable.Cell>
      <DataTable.Cell onPress={() => console.log('Pressed')} style={{}}>
Click Here
   </DataTable.Cell>
    </DataTable.Row>
  </DataTable>
  </ScrollView>
    </SafeAreaView>
            </Card.Content>
            </Card>
            <Card style={{marginBottom: 10}}>
            <Card.Title
            title="Health Condition: Detoriating"
            subtitle="Number: 1267"
            />
             <Card.Content>
             <DataTable>
    <DataTable.Header>
      <DataTable.Title>Patient ID</DataTable.Title>
      <DataTable.Title >Date</DataTable.Title>
      <DataTable.Title>Action</DataTable.Title>
    </DataTable.Header>
    <DataTable.Row>
      <DataTable.Cell>12344</DataTable.Cell>
      <DataTable.Cell>'10-05-2020'</DataTable.Cell>
      <DataTable.Cell onPress={() => console.log('Pressed')}>
Click Here
   </DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>12344</DataTable.Cell>
      <DataTable.Cell>10-21-2020</DataTable.Cell>
      <DataTable.Cell onPress={() => console.log('Pressed')}>
Click Here
   </DataTable.Cell>
    </DataTable.Row>
  </DataTable>
            </Card.Content>
            </Card>
            <Card style={{marginBottom: 10}}>
            <Card.Title
            title="Health Condition: Detoriating"
            subtitle="Number: 1267"
            />
             <Card.Content>
             <DataTable>
    <DataTable.Header>
      <DataTable.Title>Patient ID</DataTable.Title>
      <DataTable.Title >Date</DataTable.Title>
      <DataTable.Title>Action</DataTable.Title>
    </DataTable.Header>
    <DataTable.Row>
      <DataTable.Cell>12344</DataTable.Cell>
      <DataTable.Cell>'10-05-2020'</DataTable.Cell>
      <DataTable.Cell onPress={() => console.log('Pressed')}>
Click Here
   </DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>12344</DataTable.Cell>
      <DataTable.Cell>10-21-2020</DataTable.Cell>
      <DataTable.Cell onPress={() => console.log('Pressed')}>
Click Here
   </DataTable.Cell>
    </DataTable.Row>
  </DataTable>
            </Card.Content>
            </Card>
            <Card style={{marginBottom: 10}}>
            <Card.Title
            title="Health Condition: Detoriating"
            subtitle="Number: 1267"
            />
             <Card.Content>
             <DataTable>
    <DataTable.Header>
      <DataTable.Title>Patient ID</DataTable.Title>
      <DataTable.Title >Date</DataTable.Title>
      <DataTable.Title>Action</DataTable.Title>
    </DataTable.Header>
    <DataTable.Row>
      <DataTable.Cell>12344</DataTable.Cell>
      <DataTable.Cell>'10-05-2020'</DataTable.Cell>
      <DataTable.Cell onPress={() => console.log('Pressed')}>
Click Here
   </DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>12344</DataTable.Cell>
      <DataTable.Cell>10-21-2020</DataTable.Cell>
      <DataTable.Cell onPress={() => console.log('Pressed')}>
Click Here
   </DataTable.Cell>
    </DataTable.Row>

    <DataTable.Pagination
      page={1}
      numberOfPages={3}
      onPageChange={page => {
        console.log(page);
      }}
      label="1-2 of 6"
    />
  </DataTable>
            </Card.Content>
            </Card>
            </>
        
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 2,
    },
    scrollView: {
      marginHorizontal: 10,
    },
    text: {
      fontSize: 42,
    },
  });

export default PractionerView;