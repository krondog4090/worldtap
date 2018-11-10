import React from 'react';
import { Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase';
import { Font } from 'expo';
import styles from '../../src/styles/Styles';
import { numberWithCommas, abbreviateNumber } from '../../src/helpers/helpers';
import { buttonClickTwo } from '../components/SoundEffects';
import teamData from '../../lib/teamData';

const nbaTrophy = require('../../assets/images/trophy.png');

class CountryIndex extends React.Component {
  static navigationOptions = {
    header: null,
  };
    constructor(props) {
      super(props);
      this.state = {
        fontLoaded: false,
            CountryTotalScore:[],
            teamScore: [],
            TrophyCount: [],
            continentName: this.props.navigation.state.params.continentName,
      };

        this.getCountryData = this.getCountryData.bind(this);
        this.getCountryRef = this.getRef().child(`World_Teams/${this.state.continentName}/${this.state.continentName}Total/Score`);
    }
  
    componentDidMount() {
      Font.loadAsync({
        'ncaa': require('../../assets/fonts/ncaa.otf')
      }).then(() => {
        this.setState({
          fontLoaded: true,
        });
      })

        this.getCountryData(this.getCountryRef);

        Object.keys(teamData[this.state.continentName]).forEach((team) =>  this.getTeamData(team))
    }

  getRef = () => {
      return firebase.database().ref();
  }

  getCountryData(getCountryRef) {
      getCountryRef.on('value', (snap) => {
          this.setState({
              CountryTotalScore: snap.val()
          });
      });
  }

getTeamRefs = (team) => {
    return {
        teamRefTrophy: this.getRef().child(`World_Teams/${this.state.continentName}/${this.state.continentName}Teams/${team}/TrophyCount`),
        teamRef: this.getRef().child(`World_Teams/${this.state.continentName}/${this.state.continentName}Teams/${team}/Score`)
    }
}

getTeamData = (team) => {
    const { teamRefTrophy, teamRef } = this.getTeamRefs(team)
    teamRef.on('value', (snap) => {
        this.setState({
            [`${team}TeamScore`]: snap.val()
        });
    });
    teamRefTrophy.on('value', (snap) => {
        this.setState({
            [`${team}TrophyCount`]: snap.val()
        });
    });
}

    goToTeam = (country, team) => {
        buttonClickTwo();
        const { teamImage, countryName, keyTP } = teamData[country][team.split(" ").join("")]
        this.props.navigation.replace('CountryMainGame', {
            teamScore: this.state[`${team}TeamScore`],
            trophyCount: this.state[`${team}TrophyCount`],
            teamImage: teamImage,
            countryName: countryName,
            teamData: () => this.getTeamData(countryName.split(" ").join("")),
            ...this.getTeamRefs(countryName.split(" ").join("")),
            keyTP: keyTP,
            continentName: this.state.continentName
        });
    }

    render() {
      const { fontLoaded } = this.state;
      return (
        <View style={styles.containerIndex}>
        <View style={styles.eastContainer}>
        <View style={[styles.playButtonContainerTime, {flexDirection: 'column'}]}>
            <Text style={[styles.eastText, fontLoaded && { fontFamily:'ncaa'}]}>{this.state.continentName.replace(/([A-Z])/g, ' $1').trim()} Total</Text>
            <Text style={[styles.topScoreText, fontLoaded && { fontFamily: 'ncaa'}]}>{numberWithCommas(this.state.CountryTotalScore)}</Text>
        </View>
        </View>
        {/* TEAMS */}
        <FlatList
            keyExtractor={item => item.keyTP} 
            data={Object.keys(teamData[this.state.continentName]).map(key => teamData[this.state.continentName][key])}
            renderItem={({ item }) => {
                return (
                    <View style={styles.flagBox}>
                        <TouchableOpacity style={styles.buttonIndex} activeOpacity={.5} onPress={() => this.goToTeam(this.state.continentName, item.countryName.split(' ').join(''))}>
                            <Image source={item.teamImage} style={styles.flagImage} />
                            <Text style={[styles.countryText, fontLoaded && { fontFamily: 'ncaa' }]}>{item.countryName}</Text>
                            <Text style={[styles.scoreText, fontLoaded && { fontFamily: 'ncaa' }]}>
                                {abbreviateNumber(this.state[`${item.countryName.split(" ").join("")}TeamScore`])} / 50M
                            </Text>
                            <Image style={styles.trophyBox} source={nbaTrophy} />
                            <Text style={[styles.trophyText, fontLoaded && { fontFamily: 'ncaa'}]}>{this.state[`${item.countryName.split(" ").join("")}TrophyCount`]}</Text>
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
      </View>
      );
    }; 
  }

  export default withNavigation(CountryIndex);
