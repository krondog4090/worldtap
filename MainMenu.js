import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Linking,
  Image
} from 'react-native';
import { Font, Audio } from 'expo';
import { withNavigation } from 'react-navigation';
import styles from './src/styles/Styles';
import { buttonClickTwo, mainMenuLoop } from './screens/components/SoundEffects';
import CountDownScreen from './screens/components/CountDownScreen';
import CountDownScreenTwo from './screens/components/CountDownScreenTwo';
import OfflineBox from './screens/components/OfflineBox';
import './lib/refs';

const ncaa = require('./assets/fonts/ncaa.otf');
const gamefont = require('./assets/fonts/PressStart2P.ttf');
const mainmenu = require('./assets/sprites/tapbg.png');
const harvey = require('./assets/images/harvey.png');
const krondog = require('./assets/images/doghead.png');

class MainMenu extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      deadline: 'November, 21, 2022',
      isHidden: true,
      isNotHidden: false
    };
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS
    });
    mainMenuLoop();
    StatusBar.setHidden(true);
    Font.loadAsync({
      ncaa: ncaa,
      gamefont: gamefont
    }).then(() => {
      this.setState({
        fontLoaded: true
      });
    });
  }

  goSoloMode = () => {
    buttonClickTwo();
    this.props.navigation.push('SoloPreMenu', {
      keyTP: 'soloTPkey',
      keyHL: 'solokeyHL'
    });
  };

  goWorldMode = () => {
    buttonClickTwo();
    this.props.navigation.push('WorldPreMenu');
  };

  goSmallMenu = () => {
    buttonClickTwo();
    this.setState({
      isHidden: !this.state.isHidden,
      isNotHidden: !this.state.isNotHidden
    });
  };

  render() {
    const { fontLoaded } = this.state;
    return (
      <OfflineBox {...this.props}>
        {({ isConnected }) => (
          <ImageBackground source={mainmenu} style={styles.imageContainer}>
            <View style={styles.titleContainerMainMenu}>
              <View
                style={[styles.playButtonContainer, { justifyContent: 'space-evenly', flex: 0.6 }]}
              >
                <View style={styles.playButtonContainerTime}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.buttonText,
                      fontLoaded && {
                        fontFamily: 'gamefont',
                        color: 'grey',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 1, height: 2 },
                        textShadowRadius: 1,
                        textAlign: 'center',
                        fontSize: 36,
                        lineHeight: 35
                      }
                    ]}
                  >
                    WORLD TAP
                  </Text>
                </View>

                <View style={styles.playButtonContainerTime}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.buttonText,
                      fontLoaded && {
                        fontFamily: 'gamefont',
                        color: 'grey',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 1, height: 2 },
                        textShadowRadius: 1,
                        textAlign: 'center',
                        fontSize: 12
                      }
                    ]}
                  >
                    MADE BY:
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.buttonText,
                        fontLoaded && {
                          fontFamily: 'ncaa',
                          color: 'white',
                          textShadowColor: 'grey',
                          textShadowOffset: { width: 1, height: 2 },
                          textShadowRadius: 1,
                          textAlign: 'center',
                          fontSize: 14,
                          shadowColor: 'black',
                          alignItems: 'center',
                          fontSize: 18,
                          textDecorationLine: 'underline'
                        }
                      ]}
                      onPress={this._openKronDogLink}
                    >
                      KRONDOG
                    </Text>
                    <Image style={styles.flagImageCount} source={krondog} />
                  </Text>
                </View>

                <View style={styles.playButtonContainerTime}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.buttonText,
                      fontLoaded && {
                        fontFamily: 'gamefont',
                        color: 'grey',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 1, height: 2 },
                        textShadowRadius: 1,
                        textAlign: 'center',
                        fontSize: 12
                      }
                    ]}
                  >
                    ART BY:
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.buttonText,
                      fontLoaded && {
                        fontFamily: 'ncaa',
                        color: 'white',
                        textShadowColor: 'grey',
                        textShadowOffset: { width: 1, height: 2 },
                        textShadowRadius: 1,
                        textAlign: 'center',
                        fontSize: 14,
                        shadowColor: 'black',
                        alignItems: 'center',
                        fontSize: 18,
                        textDecorationLine: 'underline'
                      }
                    ]}
                    onPress={this._openHarveyLink}
                  >
                    HARVEY DENT
                  </Text>
                  <Image style={styles.flagImageCount} source={harvey} />
                </View>

                <View style={[styles.playButtonContainerTwo, { justifyContent: 'space-evenly' }]}>
                  <View style={{ top: this.state.buttonPressedThree ? 2 : 0 }}>
                    <TouchableOpacity
                      activeOpacity={10}
                      style={styles.playButtonContainergButton}
                      onPress={this.goSmallMenu}
                      onPressIn={() => this.setState({ buttonPressedThree: true })}
                      onPressOut={() => this.setState({ buttonPressedThree: false })}
                    >
                      <View
                        style={[
                          styles.playButtonContainer,
                          {
                            flexDirection: 'column',
                            alignContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#90C048'
                          }
                        ]}
                      >
                        <Text
                          allowFontScaling={false}
                          style={[
                            styles.buttonText,
                            fontLoaded && {
                              fontFamily: 'ncaa',
                              textShadowOffset: { width: 1, height: 2 },
                              textShadowRadius: 1,
                              fontSize: 14
                            }
                          ]}
                        >
                          Refresh - Info
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <CountDownScreen deadline={this.state.deadline} hide={this.state.isNotHidden} />
                  <CountDownScreenTwo deadline={this.state.deadline} hide={this.state.isHidden} />
                </View>
              </View>
            </View>

            <View style={styles.buttonLayout}>
              {isConnected ? (
                <View style={{ top: this.state.buttonPressed ? 2 : 0 }}>
                  <TouchableOpacity
                    activeOpacity={10}
                    style={styles.playButtonContainer}
                    onPress={this.goWorldMode}
                    onPressIn={() => this.setState({ buttonPressed: true })}
                    onPressOut={() => this.setState({ buttonPressed: false })}
                  >
                    <View style={styles.playButtonContainerTime}>
                      <Text
                        allowFontScaling={false}
                        style={[
                          styles.buttonText,
                          fontLoaded && {
                            fontFamily: 'ncaa',
                            textShadowOffset: { width: 1, height: 2 },
                            textShadowRadius: 1
                          }
                        ]}
                      >
                        PLAY
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={{ top: this.state.buttonPressedTwo ? 2 : 0 }}>
                <TouchableOpacity
                  activeOpacity={10}
                  style={styles.playButtonContainer}
                  onPress={this.goSoloMode}
                  onPressIn={() => this.setState({ buttonPressedTwo: true })}
                  onPressOut={() => this.setState({ buttonPressedTwo: false })}
                >
                  <View style={styles.playButtonContainerTime}>
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.buttonText,
                        fontLoaded && {
                          fontFamily: 'ncaa',
                          textShadowOffset: { width: 1, height: 2 },
                          textShadowRadius: 1
                        }
                      ]}
                    >
                      SOLO
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        )}
      </OfflineBox>
    );
  }

  _openHarveyLink = () => {
    Linking.openURL('https://www.fiverr.com/harveydentmd');
  };

  _openKronDogLink = () => {
    Linking.openURL('mailto://blakemcnarydev@gmail.com');
  };
}

export default withNavigation(MainMenu);
