import React from 'react';
import { View, Text, StatusBar, Image, Share, Platform, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase';
import { Font, AppLoading, Asset } from 'expo';
import styles from '../../src/styles/Styles';
import { buttonClick } from '../components/SoundEffects';
import GameMenuScreen from '../components/GameMenuScreen';
import ButtonSmall from '../components/ButtonSmall';
import { secondsToHms } from '../../src/helpers/helpers';

import TrumpsWallIndex from './TrumpsWallIndex';

const ncaa = require('../../assets/fonts/ncaa.otf');
const gamefont = require('../../assets/fonts/PressStart2P.ttf');
const trumpswall = require('../../assets/images/continents/fencewalltest.png');

class TrumpsWallMenu extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      TrumpsWallTotalScore: [],
      worldTotalScore: [],
      isReady: false,
      fontLoaded: false,
      isHidden: true,
      isNotHidden: false
      // adRewardAmount: 1000
    };

    this.getUrlMessageData = this.getUrlMessageData.bind(this);
    this.getTrumpsWallData = this.getTrumpsWallData.bind(this);
    this.getWorldData = this.getWorldData.bind(this);

    this.getUrlMessageRef = this.getRef().child('World_Teams/ShareMessage/UrlMessage');
    this.getTrumpsWallRef = this.getRef().child('World_Teams/TrumpsWall/TrumpsWallTotal/Score');
    this.getWorldRef = this.getRef().child('World_Teams/World/WorldTotal/Score');

    this._shareMessage = this._shareMessage.bind(this);
  }

  _shareMessage() {
    Share.share({
      ...Platform.select({
        ios: {
          message: `Trumps Wall needs more players on World Tap!`,
          url: `${this.state.urlMessage}`
        },
        android: {
          message: `Trumps Wall needs more players on World Tap!` + this.props.urlMessage
        }
      })
    }).then(({ action }) => {
      if (action === Share.dismissedAction) console.log('Share dismissed');
      else console.log('Share successful');
      this.setState({
        sentSucess: this.state.sentSucess + 1
      });
    });
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

    this.getUrlMessageData(this.getUrlMessageRef);
  }

  // componentDidUpdate() {
  //   if (this.state.timerOne === 1) {
  //     clearInterval(this.interval);
  //     this.timerOneFinished();
  //   }
  // }

  componentWillMount() {
    THREE.suppressExpoWarnings(true);
  }

  componentWillUnmount() {
    THREE.suppressExpoWarnings(false);
  }

  getRef = () => {
    return firebase.database().ref();
  };

  getTrumpsWallData(getTrumpsWallRef) {
    getTrumpsWallRef.on('value', (snap) => {
      this.setState({
        TrumpsWallTotalScore: Number(snap.val())
      });
    });
  }

  getWorldData(getWorldRef) {
    getWorldRef.on('value', (snap) => {
      this.setState({
        worldTotalScore: Number(snap.val())
      });
    });
  }

  getUrlMessageData(getUrlMessageRef) {
    getUrlMessageRef.on('value', (snap) => {
      this.setState({
        urlMessage: snap.val()
      });
    });
  }
  goAlert = () => {
    Alert.alert(`Sorry, gotta wait ${secondsToHms(this.state.timerOne)}!`);
  };

  goBack = () => {
    buttonClick();
    this.props.navigation.navigate('WorldPreMenu');
  };

  toggleMenu = () => {
    buttonClick();
    this.setState({
      isHidden: !this.state.isHidden,
      isNotHidden: !this.state.isNotHidden
    });
  };

  renderMenu = () => (
    <GameMenuScreen hide={false}>
      <View style={[styles.gameMenu, { backgroundColor: '#eafeea' }]}>
        <View style={styles.playButtonContainerTime}>
          <Text
            allowFontScaling={false}
            style={[
              styles.buttonText,
              {
                fontFamily: 'gamefont',
                color: 'grey',
                textShadowColor: 'black',
                textShadowOffset: { width: 1, height: 2 },
                textShadowRadius: 1,
                textAlign: 'center',
                lineHeight: 35
              }
            ]}
          >
            GAME MENU
          </Text>
        </View>

        <View
          style={[
            styles.playButtonContainerTime,
            { shadowColor: 'black', shadowOpacity: 0.5, justifyContent: 'center' }
          ]}
        >
          <Image style={styles.flagImageShare} source={trumpswall} />
        </View>

        <View style={[styles.buttonLayoutTwo, { flexDirection: 'column' }]}>
          <View style={styles.scoreColumn}>
            <View style={{ top: this.state.buttonPressedFour ? 2 : 0 }}>
              <ButtonSmall
                onPress={this._shareMessage}
                onPressIn={() => this.setState({ buttonPressedFour: true })}
                onPressOut={() => this.setState({ buttonPressedFour: false })}
              >
                <View style={styles.playButtonContainerTime}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.buttonText,
                      {
                        fontFamily: 'gamefont',
                        color: 'grey',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 1, height: 2 },
                        textShadowRadius: 1,
                        fontSize: 14,
                        textAlign: 'center'
                      }
                    ]}
                  >
                    SHARE WITH FRIENDS
                  </Text>
                </View>
              </ButtonSmall>
            </View>
            <View style={styles.playButtonContainerTime}>
              <Text allowFontScaling={false} style={[styles.scoreTextGame, { fontFamily: 'ncaa' }]}>
                TELL YOUR FRIENDS ABOUT TRUMPS WALL
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.buttonLayoutTwo}>
                <View style={{ top: this.state.buttonPressedFive ? 2 : 0 }}>
                  <ButtonSmall
                    onPress={this.toggleMenu}
                    onPressIn={() => this.setState({ buttonPressedFive: true })}
                    onPressOut={() => this.setState({ buttonPressedFive: false })}
                  >
                    <View style={styles.playButtonContainerTime}>
                      <Text
                        allowFontScaling={false}
                        style={[styles.scoreTextGame, { fontFamily: 'ncaa' }]}
                      >
                        CLOSE MENU
                      </Text>
                    </View>
                  </ButtonSmall>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </GameMenuScreen>
  );

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    const { fontLoaded } = this.state;
    return (
      <View style={styles.imageContainer}>
        <View style={styles.topContainer}>
          {!this.state.isHidden && this.renderMenu()}
          <View style={styles.titleContainer}>
            <View style={{ top: this.state.buttonPressed ? 2 : 0 }}>
              <ButtonSmall
                activeOpacity={10}
                style={styles.playButtonContainer}
                onPress={this.goBack}
                onPressIn={() => this.setState({ buttonPressed: true })}
                onPressOut={() => this.setState({ buttonPressed: false })}
              >
                <View style={styles.playButtonContainerTime}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.buttonTextTwo,
                      fontLoaded && {
                        fontFamily: 'gamefont',
                        color: 'grey',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 1, height: 2 },
                        textShadowRadius: 1
                      }
                    ]}
                  >
                    BACK
                  </Text>
                </View>
              </ButtonSmall>
            </View>

            <View style={styles.playButtonContainerTime}>
              <Image source={trumpswall} style={styles.flagImageMenu} />
            </View>

            <View style={{ top: this.state.buttonPressedTwo ? 2 : 0 }}>
              <ButtonSmall
                onPress={this.toggleMenu}
                onPressIn={() => this.setState({ buttonPressedTwo: true })}
                onPressOut={() => this.setState({ buttonPressedTwo: false })}
              >
                <View style={styles.playButtonContainerTime}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.buttonTextTwo,
                      {
                        fontFamily: 'gamefont',
                        color: 'grey',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 1, height: 2 },
                        textShadowRadius: 1
                      }
                    ]}
                  >
                    MENU
                  </Text>
                </View>
              </ButtonSmall>
            </View>
          </View>
          <View style={styles.container}>
            <TrumpsWallIndex />
          </View>
        </View>
      </View>
    );
  }
  async _cacheResourcesAsync() {
    const images = [
      require('../../assets/images/trophy.png'),
      require('../../assets/images/flagimages/for.png'),
      require('../../assets/images/flagimages/against.png')
    ];
    const font = [
      require('../../assets/fonts/ncaa.otf'),
      require('../../assets/fonts/PressStart2P.ttf')
    ];
    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    const cacheFont = font.map((font) => {
      return Asset.fromModule(font).downloadAsync();
    });
    return Promise.all(cacheImages, cacheFont);
  }
}

export default withNavigation(TrumpsWallMenu);
