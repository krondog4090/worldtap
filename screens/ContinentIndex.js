import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  AsyncStorage
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Font } from 'expo';
import camelcase from 'camelcase';
import { numberWithCommas } from '../src/helpers/helpers';
import { buttonClickTwo } from './components/SoundEffects';
import { getContinentRefs, worldRef } from '../lib/refs';
import teamData from '../lib/teamData';

const continentImageMap = {
  Africa: require('../assets/images/continents/africa.png'),
  Asia: require('../assets/images/continents/asia.png'),
  Oceania: require('../assets/images/continents/oceania.png'),
  Europe: require('../assets/images/continents/europe.png'),
  Americas: require('../assets/images/continents/northcentralamerica.png'),
  SouthAmerica: require('../assets/images/continents/southamerica.png'),
  Westeros: require('../assets/images/continents/westeros.png'),
  Azeroth: require('../assets/images/continents/azeroth.png'),
  TrumpsWall: require('../assets/images/continents/fencewalltest.png')
};

class ContinentIndex extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      worldTotalScore: 0,
      africaTotalTeamScore: 0,
      africaTotalTrophyCount: 0,
      asiaTotalTeamScore: 0,
      asiaTotalTrophyCount: 0,
      oceaniaTotalTeamScore: 0,
      oceaniaTotalTrophyCount: 0,
      europeTotalTeamScore: 0,
      europeTotalTrophyCount: 0,
      americasTotalTeamScore: 0,
      americasTotalTrophyCount: 0,
      southAmericaTotalTeamScore: 0,
      southAmericaTotalTrophyCount: 0,
      westerosTotalTeamScore: 0,
      westerosTotalTrophyCount: 0,
      azerothTotalTeamScore: 0,
      azerothTotalTrophyCount: 0,
      trumpsWallTotalTeamScore: 0
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    Font.loadAsync({
      ncaa: require('../assets/fonts/ncaa.otf'),
      gamesfont: require('../assets/fonts/PressStart2P.ttf')
    }).then(() => {
      this.setState({
        fontLoaded: true
      });
      this.getWorldData(this.getWorldRef);
    });

    Object.keys(teamData).forEach((continent) => {
      const isWallOrWorld = continent === 'World' || continent === 'TrumpsWall';
      this.getData(continent, !isWallOrWorld);
    });
    this.getWorldData();
  }

  getWorldData = () => {
    worldRef.on('value', (snap) => {
      this.setState({
        worldTotalScore: Number(snap.val())
      });
    });
  };

  componentWillUnmount() {
    Object.keys(teamData).forEach((continent) =>
      getContinentRefs(continent).continentRef.off('value')
    );
    worldRef.off('value');
  }

  getData = (continent, getTrophy) => {
    const { continentRef, continentRefTrophy } = getContinentRefs(continent);
    const continentKey = camelcase(continent);
    continentRef.on('value', (snap) => {
      this.setState(
        {
          [`${continentKey}TotalTeamScore`]: snap.val()
        },
        () => AsyncStorage.setItem('ContinentCachedState', JSON.stringify(this.state))
      );
    });

    if (getTrophy) {
      continentRefTrophy.on('value', (snap) => {
        this.setState({
          [`${continentKey}TotalTrophyCount`]: snap.val()
        });
      });
    }
  };

  goToMenu = (continent) => {
    buttonClickTwo();
    if (continent === 'TrumpsWall') return this.props.navigation.navigate('TrumpsWallPreMenu');
    this.props.navigation.navigate('CountryPreMenu', {
      continentName: continent,
      continentImage: continentImageMap[continent]
    });
  };

  render() {
    const { fontLoaded } = this.state;
    return (
      <View style={styles.containerCont}>
        <View style={styles.eastContainer}>
          <View style={[styles.playButtonContainerTime, { flexDirection: 'column' }]}>
            <Text
              allowFontScaling={false}
              style={[styles.eastText, fontLoaded && { fontFamily: 'ncaa' }]}
            >
              Global Score
            </Text>
            <Text
              allowFontScaling={false}
              style={[styles.topScoreText, fontLoaded && { fontFamily: 'ncaa' }]}
            >
              {numberWithCommas(this.state.worldTotalScore)}
            </Text>
          </View>
        </View>
        <ScrollView style={{ marginBottom: 70 }}>
          <View>
            {Object.keys(teamData).map((continent, i) => {
              if (continent !== 'World') {
                return (
                  <View style={styles.flagBox} key={i}>
                    <TouchableOpacity
                      style={styles.leftSide}
                      activeOpacity={0.5}
                      onPress={() => this.goToMenu(continent)}
                    >
                      <View style={styles.playButtonContainerTime}>
                        <Image source={continentImageMap[continent]} style={styles.flagImage} />
                        <Text
                          allowFontScaling={false}
                          style={[styles.countryText, fontLoaded && { fontFamily: 'ncaa' }]}
                        >
                          {teamData[continent].displayName}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={[styles.scoreText, fontLoaded && { fontFamily: 'ncaa' }]}
                        >
                          {numberWithCommas(this.state[`${camelcase(continent)}TotalTeamScore`])}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topScoreText: {
    fontSize: 22
  },
  eastContainer: {
    backgroundColor: '#0E69AA',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#d6d7da'
  },
  eastText: {
    color: 'white',
    fontSize: 32
  },
  flagImage: {
    height: 48,
    width: 48,
    resizeMode: 'contain',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5
  },

  flagBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#eafeea',
    borderWidth: 2,
    borderColor: 'grey'
  },
  countryText: {
    paddingLeft: 10,
    textAlign: 'auto',
    flex: 1,
    color: 'black',
    fontSize: 20
  },
  scoreText: {
    flex: 1,
    textAlign: 'center',
    color: 'red',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 18
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  playButtonContainerTime: {
    flexDirection: 'row',
    borderRadius: 2,
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 5 }
  }
});

export default withNavigation(ContinentIndex);
