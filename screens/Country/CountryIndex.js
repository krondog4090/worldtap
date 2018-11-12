import React from 'react';
import { Image, Text, View, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Font } from 'expo';
import styles from '../../src/styles/Styles';
import { numberWithCommas, abbreviateNumber } from '../../src/helpers/helpers';
import { buttonClickTwo } from '../components/SoundEffects';
import teamData from '../../lib/teamData';
import { getTeamRefs, getContinentRef } from '../../lib/refs';

const nbaTrophy = require('../../assets/images/trophy.png');

class CountryIndex extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      CountryTotalScore: [],
      teamScore: [],
      TrophyCount: [],
      continentName: this.props.navigation.state.params.continentName
    };

    this.continentRef = getContinentRef(this.state.continentName);
  }

  componentDidMount() {
    Font.loadAsync({
      ncaa: require('../../assets/fonts/ncaa.otf')
    }).then(() => {
      this.setState({
        fontLoaded: true
      });
    });

    this.willFocusSub = this.props.navigation.addListener('willFocus', () => {
      teamData[this.state.continentName].countries.forEach((team) => this.getTeamData(team));
    });

    this.getContinentRef(this.continentRef);

    teamData[this.state.continentName].countries.forEach((team) => this.getTeamData(team));
  }

  componentWillUnmount() {
    this.continentRef.off('value');
    this.willFocusSub.remove();
  }

  getContinentRef = (continentRef) => {
    continentRef.on('value', (snap) => {
      this.setState({
        CountryTotalScore: snap.val()
      });
    });
  };

  getTeamData = (team) => {
    const teamName = team.countryName.split(' ').join('');
    const { teamRefTrophy, teamRef } = getTeamRefs(teamName, this.state.continentName);
    teamRef.on('value', (snap) => {
      this.setState(
        {
          [`${teamName}TeamScore`]: snap.val()
        },
        () =>
          AsyncStorage.setItem(`${this.state.continentName}CachedState`, JSON.stringify(this.state))
      );
    });
    teamRefTrophy.on('value', (snap) => {
      this.setState({
        [`${teamName}TrophyCount`]: snap.val()
      });
    });
  };

  goToTeam = (team) => {
    buttonClickTwo();
    const { teamImage, countryName, keyTP } = team;
    const teamName = team.countryName.split(' ').join('');
    this.props.navigation.push('CountryMainGame', {
      teamScore: this.state[`${teamName}TeamScore`],
      trophyCount: this.state[`${teamName}TrophyCount`],
      teamImage: teamImage,
      countryName: countryName,
      teamData: () => this.getTeamData(countryName.split(' ').join('')),
      ...getTeamRefs(countryName.split(' ').join(''), this.state.continentName),
      keyTP: keyTP,
      continentName: this.state.continentName
    });
  };

  render() {
    const { fontLoaded } = this.state;
    return (
      <View style={styles.containerIndex}>
        <View style={styles.eastContainer}>
          <View style={[styles.playButtonContainerTime, { flexDirection: 'column' }]}>
            <Text
              allowFontScaling={false}
              style={[styles.eastText, fontLoaded && { fontFamily: 'ncaa' }]}
            >
              {this.state.continentName.replace(/([A-Z])/g, ' $1').trim()} Total
            </Text>
            <Text
              allowFontScaling={false}
              style={[styles.topScoreText, fontLoaded && { fontFamily: 'ncaa' }]}
            >
              {numberWithCommas(this.state.CountryTotalScore)}
            </Text>
          </View>
        </View>
        {/* TEAMS */}
        <FlatList
          keyExtractor={(item) => item.keyTP}
          data={teamData[this.state.continentName].countries}
          extraData={this.state}
          renderItem={({ item }) => {
            return (
              <View style={styles.flagBox} key={item.countryName}>
                <TouchableOpacity
                  style={styles.buttonIndex}
                  activeOpacity={0.5}
                  onPress={() => this.goToTeam(item)}
                >
                  <Image source={item.teamImage} style={styles.flagImage} />
                  <Text
                    allowFontScaling={false}
                    style={[styles.countryText, fontLoaded && { fontFamily: 'ncaa' }]}
                  >
                    {item.countryName}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[styles.scoreText, fontLoaded && { fontFamily: 'ncaa' }]}
                  >
                    {abbreviateNumber(
                      this.state[`${item.countryName.split(' ').join('')}TeamScore`]
                    )}{' '}
                    / 50M
                  </Text>
                  <Image style={styles.trophyBox} source={nbaTrophy} />
                  <Text
                    allowFontScaling={false}
                    style={[styles.trophyText, fontLoaded && { fontFamily: 'ncaa' }]}
                  >
                    {this.state[`${item.countryName.split(' ').join('')}TrophyCount`]}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

export default withNavigation(CountryIndex);
