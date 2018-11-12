import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase';
import { Font } from 'expo';
import styles from '../src/styles/Styles';
import { buttonClick } from './components/SoundEffects';

import ContinentIndex from './ContinentIndex';

const ncaa = require('../assets/fonts/ncaa.otf');
const gamefont = require('../assets/fonts/PressStart2P.ttf');

class WorldMenu extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      titleTwo: ''
    };

    this.getTitleTwoData = this.getTitleTwoData.bind(this);
    this.getTitleTwoRef = this.getRef().child('World_Teams/World/Titles/TitleTwo');
  }

  async componentDidMount() {
    StatusBar.setHidden(true);
    Font.loadAsync({
      ncaa: ncaa,
      gamefont: gamefont
    }).then(() => {
      this.setState({
        fontLoaded: true
      });
    });
    this.getTitleTwoData(this.getTitleTwoRef);
  }

  getRef = () => {
    return firebase.database().ref();
  };

  getTitleTwoData(getTitleTwoRef) {
    getTitleTwoRef.on('value', (snap) => {
      this.setState({
        titleTwo: snap.val()
      });
    });
  }

  goBack = () => {
    buttonClick();
    this.props.navigation.navigate('PreMainMenu');
  };

  render() {
    const { fontLoaded } = this.state;

    return (
      <SafeAreaView style={styles.topContainer}>
        <View style={styles.titleContainerMenu}>
          <View style={{ top: this.state.buttonPressed ? 2 : 0 }}>
            <TouchableOpacity
              activeOpacity={10}
              style={[styles.playButtonContainer, { padding: 3 }]}
              onPress={this.goBack}
              onPressIn={() => this.setState({ buttonPressed: true })}
              onPressOut={() => this.setState({ buttonPressed: false })}
            >
              <View style={styles.playButtonContainerTime}>
                <Text
                  style={[
                    styles.buttonText,
                    fontLoaded && {
                      fontFamily: 'gamefont',
                      color: 'grey',
                      textShadowColor: 'black',
                      textShadowOffset: { width: 1, height: 2 },
                      textShadowRadius: 1,
                      textAlign: 'center'
                    }
                  ]}
                >
                  HOME SCREEN
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.playButtonContainerTime} />
        </View>
        <View style={styles.container}>
          <ContinentIndex />
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(WorldMenu);
