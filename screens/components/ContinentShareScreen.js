import React from 'react';
import { View, Text, TouchableOpacity, Image, Share, Platform } from 'react-native';
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase';
import { Font } from 'expo';
import styles from '../../src/styles/Styles';
import { buttonClick } from '../components/SoundEffects';

import { ncaa } from '../../assets/fonts/ncaa.otf';

class ContinentMainShareScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      urlMessage: '',
      sentSucess: 0,
      continentName: this.props.navigation.state.params.continentName,
      continentImage: this.props.navigation.state.params.continentImage
    };
    this.getUrlMessageData = this.getUrlMessageData.bind(this);
    this.getUrlMessageRef = this.getRef().child('World_Teams/ShareMessage/UrlMessage');
    this._shareMessage = this._shareMessage.bind(this);
  }

  _shareMessage() {
    Share.share({
      ...Platform.select({
        ios: {
          message: `${this.state.countryShareName} needs more players on World Tap!`,
          url: `${this.state.urlMessage}`
        },
        android: {
          message:
            `${this.state.countryName} needs more players on World Tap!` + this.props.urlMessage
        }
      })
    }).then(({ action, activityType }) => {
      if (action === Share.dismissedAction) console.log('Share dismissed');
      else console.log('Share successful');
      this.setState({
        sentSucess: this.state.sentSucess + 1
      });
    });
  }

  async componentDidMount() {
    Font.loadAsync({
      ncaa: ncaa
    }).then(() => {
      this.setState({
        fontLoaded: true
      });
    });

    this.getUrlMessageData(this.getUrlMessageRef);
  }

  getRef = () => {
    return firebase.database().ref();
  };

  getUrlMessageData(getUrlMessageRef) {
    getUrlMessageRef.on('value', (snap) => {
      this.setState({
        urlMessage: snap.val()
      });
    });
  }

  goBack = () => {
    buttonClick();
    this.props.navigation.goBack();
  };

  render() {
    const { fontLoaded } = this.state;
    return (
      <View style={styles.containerShare}>
        <View style={styles.flexPadding} />
        <View style={styles.playButtonContainerTime}>
          <View style={styles.titleContainerMainMenu}>
            <Image style={styles.countryImageShare} source={this.state.continentImage} />
          </View>
        </View>
        <View style={styles.flexPadding} />

        <View style={{ top: this.state.buttonPressedTwo ? 2 : 0 }}>
          <TouchableOpacity
            activeOpacity={10}
            style={styles.playButtonContainer}
            onPress={this._shareMessage}
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
                    color: 'black',
                    textShadowOffset: { width: 1, height: 2 },
                    textShadowRadius: 1,
                    textAlign: 'center',
                    fontSize: 36
                  }
                ]}
              >
                PRESS TO SHARE FOR {this.state.continentName}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.flexPadding} />
        <View style={styles.playButtonContainerTime}>
          <Text
            allowFontScaling={false}
            style={[
              styles.underText,
              fontLoaded && { fontFamily: 'ncaa', color: 'black', textAlign: 'center' }
            ]}
          >
            Help {this.state.continentName} by sharing with your friends.
          </Text>
        </View>

        <View style={{ top: this.state.buttonPressed ? 2 : 0 }}>
          <TouchableOpacity
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
                  styles.buttonText,
                  fontLoaded && {
                    fontFamily: 'ncaa',
                    color: 'black',
                    textShadowOffset: { width: 1, height: 2 },
                    textShadowRadius: 1
                  }
                ]}
              >
                BACK
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(ContinentMainShareScreen);
