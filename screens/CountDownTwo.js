import React, { Component } from 'react';
import { Text, View, Linking } from 'react-native';
import * as firebase from 'firebase';
import { Font } from 'expo';
import styles from '../src/styles/Styles';

const ncaa = require('../assets/fonts/ncaa.otf');
const shrug = '😅';

class CountDownTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }

  componentWillMount() {}

  async componentDidMount() {
    Font.loadAsync({
      ncaa: ncaa
    }).then(() => {
      this.setState({
        fontLoaded: true
      });
    });
  }

  getRef = () => {
    return firebase.database().ref();
  };

  render() {
    const { fontLoaded } = this.state;
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={[
            styles.playButtonContainerTime,
            { flexDirection: 'column', alignItems: 'center', shadowOpacity: 0.2 }
          ]}
        >
          <Text
            allowFontScaling={false}
            style={[
              fontLoaded && {
                fontFamily: 'ncaa',
                color: 'black',
                fontSize: 14,
                textAlign: 'center'
              }
            ]}
          >
            World Tap is a game where players can play together for their countries.
          </Text>
        </View>

        <View
          style={[
            styles.playButtonContainerTime,
            { flexDirection: 'column', alignItems: 'center', shadowOpacity: 0.2 }
          ]}
        >
          <Text
            allowFontScaling={false}
            style={[
              fontLoaded && {
                fontFamily: 'ncaa',
                color: 'black',
                fontSize: 14,
                textAlign: 'center'
              }
            ]}
          >
            A winner will be declared at the start of the next World Cup in{' '}
            <Text allowFontScaling={false} style={{ color: 'red' }}>
              2022
            </Text>
            .
          </Text>
        </View>

        <View
          style={[
            styles.playButtonContainerTime,
            { flexDirection: 'column', alignItems: 'center', shadowOpacity: 0.2 }
          ]}
        >
          <Text
            allowFontScaling={false}
            style={[
              fontLoaded && {
                fontFamily: 'ncaa',
                color: 'white',
                fontSize: 14,
                textAlign: 'center'
              }
            ]}
          >
            GOOD LUCK, TELL YOUR FRIENDS, AND HAVE FUN!
          </Text>
        </View>
        <View
          style={[
            styles.playButtonContainerTime,
            { flexDirection: 'column', alignItems: 'center', shadowOpacity: 0.2 }
          ]}
        >
          <Text
            allowFontScaling={false}
            style={[
              fontLoaded && {
                fontFamily: 'ncaa',
                color: 'black',
                fontSize: 8,
                textAlign: 'center'
              }
            ]}
          >
            There are a few bugs. {shrug}
          </Text>
        </View>
      </View>
    );
  }

  //   _openEvanBacon = () => {
  //     Linking.openURL('https://twitter.com/baconbrix');
  //   };
}

export default CountDownTwo;
