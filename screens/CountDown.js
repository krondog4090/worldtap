import React, { Component } from 'react';
import { Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Font } from 'expo';
import styles from '../src/styles/Styles';
import { numberWithCommas } from '../src/helpers/helpers/';

const ncaa = require('../assets/fonts/ncaa.otf');

class CountDown extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      countryLeaderName: '',
      continentLeaderName: '',
      TrumpsTotalTeamScore: []
    };

    this.getCountryNameData = this.getCountryNameData.bind(this);
    this.getCountryNameRef = this.getRef().child('World_Teams/World/Titles/CountryLeader');

    this.getContLeaderData = this.getContLeaderData.bind(this);
    this.getContLeaderRef = this.getRef().child('World_Teams/World/Titles/ContinentLeader');

    this.getTrumpsWallData = this.getTrumpsWallData.bind(this);
    this.getTrumpsWallRef = this.getRef().child('World_Teams/TrumpsWall/TrumpsWallTotal/Score');
  }

  componentWillMount() {
    if (this._isMounted) {
      this.getTimeUntil(this.props.deadline);
    }
  }

  componentWillUnmount() {
    this.getCountryNameRef.off('value');
    this.getContLeaderRef.off('value');
    this.getTrumpsWallRef.off('value');
    if (this.interval) clearInterval(this.interval);
  }

  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      Font.loadAsync({
        ncaa: ncaa
      }).then(() => {
        this.setState({
          fontLoaded: true
        });
      });
      this.getCountryNameData(this.getCountryNameRef);
      this.getContLeaderData(this.getContLeaderRef);
      this.getTrumpsWallData(this.getTrumpsWallRef);

      this.interval = setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
    }
  }

  getRef = () => {
    return firebase.database().ref();
  };

  getTrumpsWallData(getTrumpsWallRef) {
    getTrumpsWallRef.on('value', (snap) => {
      this.setState({
        TrumpsWallTotalTeamScore: snap.val()
      });
    });
  }

  getCountryNameData(getCountryNameRef) {
    getCountryNameRef.on('value', (snap) => {
      this.setState({
        countryLeaderName: snap.val()
      });
    });
  }

  getContLeaderData(getContLeaderRef) {
    getContLeaderRef.on('value', (snap) => {
      this.setState({
        continentLeaderName: snap.val()
      });
    });
  }

  leading0(num) {
    return num < 10 ? '0' + num : num;
  }
  getTimeUntil(deadline) {
    if (this._isMounted) {
      const time = Date.parse(deadline) - Date.parse(new Date());
      if (time < 0) {
        this.setState({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      } else {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        this.setState({
          days,
          hours,
          minutes,
          seconds
        });
      }
    }
  }

  render() {
    const { fontLoaded } = this.state;
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.playButtonContainerTime}>
            <Text
              allowFontScaling={false}
              style={[fontLoaded && { fontFamily: 'ncaa', fontSize: 20, color: 'red' }]}
            >
              {numberWithCommas(this.leading0(this.state.days))}
              <Text
                allowFontScaling={false}
                style={[
                  fontLoaded && {
                    fontFamily: 'ncaa',
                    color: 'black',
                    fontSize: 16
                  }
                ]}
              >
                {' '}
                Days -{' '}
              </Text>
            </Text>

            <Text
              allowFontScaling={false}
              style={[fontLoaded && { fontFamily: 'ncaa', fontSize: 20, color: 'red' }]}
            >
              {this.leading0(this.state.hours)}
              <Text
                allowFontScaling={false}
                style={[
                  fontLoaded && {
                    fontFamily: 'ncaa',
                    color: 'black',
                    fontSize: 16
                  }
                ]}
              >
                {' '}
                Hrs -{' '}
              </Text>
            </Text>

            <Text
              allowFontScaling={false}
              style={[fontLoaded && { fontFamily: 'ncaa', fontSize: 20, color: 'red' }]}
            >
              {this.leading0(this.state.minutes)}
              <Text
                allowFontScaling={false}
                style={[
                  fontLoaded && {
                    fontFamily: 'ncaa',
                    color: 'black',
                    fontSize: 16
                  }
                ]}
              >
                {' '}
                Mins -{' '}
              </Text>
            </Text>

            <Text
              allowFontScaling={false}
              style={[fontLoaded && { fontFamily: 'ncaa', fontSize: 20, color: 'red' }]}
            >
              {this.leading0(this.state.seconds)}
              <Text
                allowFontScaling={false}
                style={[
                  fontLoaded && {
                    fontFamily: 'ncaa',
                    color: 'black',
                    fontSize: 16
                  }
                ]}
              >
                {' '}
                Secs{' '}
              </Text>
            </Text>
          </View>
        </View>
        {/* <View style={[styles.playButtonContainerTime, { flexDirection: "column", alignItems: "center", shadowOpacity: .2 }]}>
          <Text allowFontScaling={false}style={[fontLoaded && { fontFamily: "ncaa", color: "black", fontSize: 18 }]}>
            Current Continent Leader
          </Text>
          <Text allowFontScaling={false}style={[fontLoaded && { fontFamily: "ncaa", color: "white", fontSize: 16 }]}>
            {this.state.continentLeaderName}
          </Text>
        </View> */}

        <View
          style={[
            styles.playButtonContainerTime,
            { flexDirection: 'column', alignItems: 'center', shadowOpacity: 0.2 }
          ]}
        >
          <Text
            allowFontScaling={false}
            style={[fontLoaded && { fontFamily: 'ncaa', color: 'black', fontSize: 18 }]}
          >
            Current Leader
          </Text>
          <Text
            allowFontScaling={false}
            style={[fontLoaded && { fontFamily: 'ncaa', color: 'white', fontSize: 16 }]}
          >
            {this.state.countryLeaderName}
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
            style={[fontLoaded && { fontFamily: 'ncaa', color: 'black', fontSize: 18 }]}
          >
            Trumps Wall
          </Text>
          <Text
            allowFontScaling={false}
            style={[fontLoaded && { fontFamily: 'ncaa', color: 'white', fontSize: 16 }]}
          >
            {this.state.TrumpsWallTotalTeamScore}{' '}
            <Text allowFontScaling={false} style={{ color: 'black', fontSize: 16 }}>
              ft.
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

export default CountDown;
