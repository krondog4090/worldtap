import React from 'react';
import { Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Font } from 'expo';
import { withNavigation } from 'react-navigation';
import styles from '../src/styles/Styles';
import { numberWithCommas } from '../src/helpers/helpers/';
import '../lib/leaderCalculations';
import teamData from '../lib/teamData';
import { getRef } from '../lib/refs';

const ncaa = require('../assets/fonts/ncaa.otf');
const continents = Object.keys(teamData);
const gotScoresPromises = [];

class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      worldTotalScore: [],
      countryLeader: ''
    };

    this.getWorldData = this.getWorldData.bind(this);
    this.getWorldRef = this.getRef().child('World_Teams/World/WorldTotal/Score');
  }

  async componentDidMount() {
    Font.loadAsync({
      ncaa: ncaa
    }).then(() => {
      this.setState({
        fontLoaded: true
      });
    });
    this.getWorldData(this.getWorldRef);
    this.interval = setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
    this.getHighScore();
  }

  componentWillMount() {
    this.getTimeUntil(this.props.deadline);
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
    this.getWorldRef.off('value');
  }

  getHighScore = () => {
    const countryTotalScores = continents
      .map((continentName) => {
        return teamData[continentName].countries.map((team) => {
          return new Promise((resolve) => {
            getRef()
              .child(
                `World_Teams/${continentName}/${continentName}Teams/${team.countryName
                  .split(' ')
                  .join('')}/Score`
              )
              .on('value', (snap) => {
                const score = snap.val();
                resolve({ countryName: team.countryName, score: score });
              });
          });
        });
      })
      .flat();

    Promise.all(countryTotalScores).then((arrayValues) => {
      let highestScore = -1;
      let highestScoringCountry = null;
      const highScore = arrayValues.reduce((a, b) => {
        if (b.score > a.score) return b;
        else return a;
      });
      this.setState({
        countryLeader: highScore.countryName
      });
      // console.log(highScore);
    });
  };

  getWorldData(getWorldRef) {
    getWorldRef.on('value', (snap) => {
      this.setState({
        worldTotalScore: Number(snap.val())
      });
    });
  }

  leading0(num) {
    return num < 10 ? '0' + num : num;
  }
  getTimeUntil(deadline) {
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
            style={[fontLoaded && { fontFamily: 'ncaa', color: 'white', fontSize: 16 }]}
          >
            World Cup Starts In
          </Text>
        </View>
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
            Global Score
          </Text>
          <Text
            allowFontScaling={false}
            style={[fontLoaded && { fontFamily: 'ncaa', color: 'white', fontSize: 16 }]}
          >
            {numberWithCommas(this.state.worldTotalScore)}
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
            Country Leader
          </Text>
          <Text
            allowFontScaling={false}
            style={[fontLoaded && { fontFamily: 'ncaa', color: 'white', fontSize: 16 }]}
          >
            {this.state.countryLeader}
          </Text>
        </View>
      </View>
    );
  }
}

export default withNavigation(CountDown);
