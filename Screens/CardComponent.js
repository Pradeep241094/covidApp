import * as React from 'react';
import { Card, Title } from 'react-native-paper';
import { View } from 'react-native';
import { Slider } from 'react-native-elements';

class CardComponent extends React.Component{

    render() {
        const {title, value} = this.props;
        return (
            <Card style={{paddingBottom: 0, paddingTop: 0, marginTop: 0, marginBottom: 0}}>
            <Card.Content style={{paddingBottom: 0, paddingTop: 0, marginTop: 0, marginBottom: 0}}>
                <Title style={{paddingBottom: 0, paddingTop: 0}}>{title} : {value}</Title>
              <Slider
                    value={value}
                    maximumValue= {5}
                    disabled = {true}
                    thumbTintColor={'#1DDCAF'}
                    style={{paddingBottom: 0, paddingTop: 0}}
                 />
            </Card.Content>
          </Card>
        )
    }
}

export default CardComponent;