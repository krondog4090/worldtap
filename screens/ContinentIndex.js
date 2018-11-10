import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase';
import { Font } from 'expo';
import { numberWithCommas } from '../src/helpers/helpers';
import { buttonClickTwo } from './components/SoundEffects';

const africa = require('../assets/images/continents/africa.png');
const asia = require('../assets/images/continents/asia.png');
const oceania = require('../assets/images/continents/oceania.png');
const europe = require('../assets/images/continents/europe.png');
const northCentralAmerica = require('../assets/images/continents/northcentralamerica.png');
const southAmerica = require('../assets/images/continents/southamerica.png');
const westeros = require('../assets/images/continents/westeros.png');
const azeroth = require('../assets/images/continents/azeroth.png');
const trumpswall = require('../assets/images/continents/fencewalltest.png');


class ContinentIndex extends React.Component {
  static navigationOptions = {
    header: null,
  };
    constructor(props) {
      super(props);
      this.state = {
        fontLoaded: false,
            worldTotalScore:[],
            africaTotalTeamScore: [],
            africaTotalTrophyCount: [],
            asiaTotalTeamScore: [],
            asiaTotalTrophyCount: [],
            oceaniaTotalTeamScore: [],
            oceaniaTotalTrophyCount: [],
            europeTotalTeamScore: [],
            europeTotalTrophyCount: [],
            americasTotalTeamScore: [],
            americasTotalTrophyCount: [],
            southAmericaTotalTeamScore: [],
            southAmericaTotalTrophyCount: [],
            westerosTotalTeamScore: [],
            westerosTotalTrophyCount: [],
            azerothTotalTeamScore: [],
            azerothTotalTrophyCount: [],
            TrumpsWallTotalTeamScore: []
      };

        this.getWorldData = this.getWorldData.bind(this);
        this.getAfricaData = this.getAfricaData.bind(this);
        this.getAsiaData = this.getAsiaData.bind(this);
        this.getOceaniaData = this.getOceaniaData.bind(this);
        this.getEuropeData = this.getEuropeData.bind(this);
        this.getAmericasData = this.getAmericasData.bind(this);
        this.getSouthAmericaData = this.getSouthAmericaData.bind(this);
        this.getWesterosData = this.getWesterosData.bind(this);
        this.getAzerothData = this.getAzerothData.bind(this);
        this.getTrumpsWallData = this.getTrumpsWallData.bind(this);
    
        this.getWorldRef = this.getRef().child('World_Teams/World/WorldTotal/Score');
        this.getAfricaRef = this.getRef().child('World_Teams/Africa/AfricaTotal/Score');
        this.getAsiaRef = this.getRef().child('World_Teams/Asia/AsiaTotal/Score');
        this.getOceaniaRef = this.getRef().child('World_Teams/Oceania/OceaniaTotal/Score');
        this.getEuropeRef = this.getRef().child('World_Teams/Europe/EuropeTotal/Score');
        this.getAmericasRef = this.getRef().child('World_Teams/Americas/AmericasTotal/Score');
        this.getSouthAmericaRef = this.getRef().child('World_Teams/SouthAmerica/SouthAmericaTotal/Score');
        this.getWesterosRef = this.getRef().child('World_Teams/Westeros/WesterosTotal/Score');
        this.getAzerothRef = this.getRef().child('World_Teams/Azeroth/AzerothTotal/Score');
        this.getTrumpsWallRef = this.getRef().child('World_Teams/TrumpsWall/TrumpsWallTotal/Score');

        this.getAfricaRefTrophy = this.getRef().child('World_Teams/Africa/AfricaTotal/TrophyCount');
        this.getAsiaRefTrophy = this.getRef().child('World_Teams/Asia/AsiaTotal/TrophyCount');
        this.getOceaniaRefTrophy = this.getRef().child('World_Teams/Oceania/OceaniaTotal/TrophyCount');
        this.getEuropeRefTrophy = this.getRef().child('World_Teams/Oceania/EuropeTotal/TrophyCount');
        this.getAmericasRefTrophy = this.getRef().child('World_Teams/Americas/AmericasTotal/TrophyCount');
        this.getSouthAmericaRefTrophy = this.getRef().child('World_Teams/SouthAmerica/SouthAmericaTotal/TrophyCount');
        this.getWesterosRefTrophy = this.getRef().child('World_Teams/Westeros/WesterosTotal/TrophyCount');
        this.getAzerothRefTrophy = this.getRef().child('World_Teams/Azeroth/AzerothTotal/TrophyCount');
    }
  
    componentDidMount() {
      StatusBar.setHidden(true);
      Font.loadAsync({
        'ncaa': require('../assets/fonts/ncaa.otf'),
        'gamesfont': require('../assets/fonts/PressStart2P.ttf')
      }).then(() => {
        this.setState({
          fontLoaded: true,
        });
      })
        this.getWorldData(this.getWorldRef);
        this.getAfricaData(this.getAfricaRef, this.getAfricaRefTrophy);
        this.getAsiaData(this.getAsiaRef, this.getAsiaRefTrophy);
        this.getOceaniaData(this.getOceaniaRef, this.getOceaniaRefTrophy);
        this.getEuropeData(this.getEuropeRef, this.getEuropeRefTrophy);
        this.getAmericasData(this.getAmericasRef, this.getAmericasRefTrophy);
        this.getSouthAmericaData(this.getSouthAmericaRef, this.getSouthAmericaRefTrophy);
        this.getWesterosData(this.getWesterosRef, this.getWesterosRefTrophy);
        this.getAzerothData(this.getAzerothRef, this.getAzerothRefTrophy);
        this.getTrumpsWallData(this.getTrumpsWallRef);
    }

    getRef = () => {
      return firebase.database().ref();
  }

getWorldData(getWorldRef) {
      getWorldRef.on('value', (snap) => {
          this.setState({
              worldTotalScore: snap.val()
          });
      });
}
getAfricaData(getAfricaRef, getAfricaRefTrophy) {
      getAfricaRef.on('value', (snap) => {
          this.setState({
              africaTotalTeamScore: snap.val()
          });
      });
      getAfricaRefTrophy.on('value', (snap) => {
          this.setState({
              africaTotalTrophyCount: snap.val()
          });
      });
}
getAsiaData(getAsiaRef, getAsiaRefTrophy) {
      getAsiaRef.on('value', (snap) => {
          this.setState({
              asiaTotalTeamScore: snap.val()
          });
      });
      getAsiaRefTrophy.on('value', (snap) => {
          this.setState({
              asiaTotalTrophyCount: snap.val()
          });
      });
}
getOceaniaData(getOceaniaRef, getOceaniaRefTrophy) {
      getOceaniaRef.on('value', (snap) => {
          this.setState({
              oceaniaTotalTeamScore: snap.val()
          });
      });
      getOceaniaRefTrophy.on('value', (snap) => {
          this.setState({
              oceaniaTotalTrophyCount: snap.val()
          });
      });
}
  getEuropeData(getEuropeRef, getEuropeRefTrophy) {
    getEuropeRef.on('value', (snap) => {
        this.setState({
            europeTotalTeamScore: snap.val()
        });
    });
    getEuropeRefTrophy.on('value', (snap) => {
        this.setState({
            europeTotalTrophyCount: snap.val()
        });
    });
}
getAmericasData(getAmericasRef, getAmericasRefTrophy) {
    getAmericasRef.on('value', (snap) => {
        this.setState({
            americasTotalTeamScore: snap.val()
        });
    });
    getAmericasRefTrophy.on('value', (snap) => {
        this.setState({
            americasTotalTrophyCount: snap.val()
        });
    });
}
getSouthAmericaData(getSouthAmericaRef, getSouthAmericaRefTrophy) {
    getSouthAmericaRef.on('value', (snap) => {
        this.setState({
            southAmericaTotalTeamScore: snap.val()
        });
    });
    getSouthAmericaRefTrophy.on('value', (snap) => {
        this.setState({
            southAmericaTotalTrophyCount: snap.val()
        });
    });
}
getWesterosData(getWesterosRef, getWesterosRefTrophy) {
    getWesterosRef.on('value', (snap) => {
        this.setState({
            westerosTotalTeamScore: snap.val()
        });
    });
    getWesterosRefTrophy.on('value', (snap) => {
        this.setState({
            westerosTotalTrophyCount: snap.val()
        });
    });
}
getAzerothData(getAzerothRef, getAzerothRefTrophy) {
    getAzerothRef.on('value', (snap) => {
        this.setState({
            azerothTotalTeamScore: snap.val()
        });
    });
    getAzerothRefTrophy.on('value', (snap) => {
        this.setState({
            azerothTotalTrophyCount: snap.val()
        });
    });
}
getTrumpsWallData(getTrumpsWallRef) {
    getTrumpsWallRef.on('value', (snap) => {
        this.setState({
            TrumpsWallTotalTeamScore: snap.val()
        });
    });
}

goAfricaMenu = () => {
    buttonClickTwo();
    this.props.navigation.replace('CountryPreMenu', {
        continentName: 'Africa',
        continentImage: africa
    });
}
goAsiaMenu = () => {
    buttonClickTwo();
    this.props.navigation.replace('CountryPreMenu', {
        continentName: 'Asia',
        continentImage: asia
    });
}
goOceaniaMenu = () => {
    buttonClickTwo();
    this.props.navigation.replace('CountryPreMenu', {
        continentName: 'Oceania',
        continentImage: oceania
    });
}
goEuropeMenu = () => {
    buttonClickTwo();
    this.props.navigation.replace('CountryPreMenu', {
        continentName: 'Europe',
        continentImage: europe
    });
}
goAmericasMenu = () => {
    buttonClickTwo();
    this.props.navigation.replace('CountryPreMenu', {
        continentName: 'Americas',
        continentImage: northCentralAmerica
    })
}
goSouthAmericaMenu = () => {
    buttonClickTwo();
    this.props.navigation.replace('CountryPreMenu', {
        continentName: 'SouthAmerica',
        continentImage: southAmerica
    })
}
goWesterosMenu = () => {
    buttonClickTwo();
    this.props.navigation.replace('CountryPreMenu', {
        continentName: 'Westeros',
        continentImage: westeros
    })
}
goAzerothMenu = () => {
    buttonClickTwo();
    this.props.navigation.replace('CountryPreMenu', {
        continentName: 'Azeroth',
        continentImage: azeroth
    })
}
goTrumpsWallMenu = () => {
    buttonClickTwo();
    this.props.navigation.replace('TrumpsWallPreMenu')
}  

    render() {
      const { fontLoaded } = this.state;
      return (
        <View style={styles.containerCont}>
        <View style={styles.eastContainer}>
            <View style={[styles.playButtonContainerTime, {flexDirection: 'column'}]}>
                <Text style={[styles.eastText, fontLoaded && { fontFamily:'ncaa'}]}>Global Score</Text>
                <Text style={[styles.topScoreText, fontLoaded && { fontFamily: 'ncaa'}]}>{numberWithCommas(this.state.worldTotalScore)}</Text>
            </View>
        </View>
        {/* TEAMS */}
        {/* <View style={{height: windowHeight}}> */}
        {/* <View style={{flex: 1}}> */}
        <ScrollView style={{marginBottom: 70}}>
        <View>
          <View style={styles.flagBox}>
            <TouchableOpacity style={styles.leftSide} activeOpacity={.5} onPress={() =>  this.goAfricaMenu()}>
            <View style={styles.playButtonContainerTime}>
                <Image source={africa} style={styles.flagImage} />
                <Text style={[styles.countryText, fontLoaded && { fontFamily: 'ncaa' }]}>Africa</Text>
                <Text style={[styles.scoreText, fontLoaded && { fontFamily: 'ncaa' }]}>{numberWithCommas(this.state.africaTotalTeamScore)}</Text>
                </View>
            </TouchableOpacity>
          </View>

          <View style={styles.flagBox}>
            <TouchableOpacity style={styles.leftSide} activeOpacity={.5} onPress={() =>  this.goAsiaMenu()}>
            <View style={styles.playButtonContainerTime}>
                <Image source={asia} style={styles.flagImage} />
                <Text style={[styles.countryText, fontLoaded && { fontFamily: 'ncaa' }]}>Asia</Text>
                <Text style={[styles.scoreText, fontLoaded && { fontFamily: 'ncaa' }]}>{numberWithCommas(this.state.asiaTotalTeamScore)}</Text>
                </View>
            </TouchableOpacity>
          </View>

          <View style={styles.flagBox}>
            <TouchableOpacity style={styles.leftSide} activeOpacity={.5} onPress={() =>  this.goOceaniaMenu()}>
            <View style={styles.playButtonContainerTime}>
                <Image source={oceania} style={styles.flagImage} />
                <Text style={[styles.countryText, fontLoaded && { fontFamily: 'ncaa' }]}>Oceania</Text>
                <Text style={[styles.scoreText, fontLoaded && { fontFamily: 'ncaa' }]}>{numberWithCommas(this.state.oceaniaTotalTeamScore)}</Text>
                </View>
            </TouchableOpacity>
          </View>

          <View style={styles.flagBox}>
            <TouchableOpacity style={styles.leftSide} activeOpacity={.5} onPress={() =>  this.goEuropeMenu()}>
            <View style={styles.playButtonContainerTime}>
                <Image source={europe} style={styles.flagImage} />
                <Text style={[styles.countryText, fontLoaded && { fontFamily: 'ncaa' }]}>Europe</Text>
                <Text style={[styles.scoreText, fontLoaded && { fontFamily: 'ncaa' }]}>{numberWithCommas(this.state.europeTotalTeamScore)}</Text>
                </View>
            </TouchableOpacity>
          </View>

          <View style={styles.flagBox}>
            <TouchableOpacity style={styles.leftSide} activeOpacity={.5} onPress={() =>  this.goAmericasMenu()}>
            <View style={styles.playButtonContainerTime}>
                <Image source={northCentralAmerica} style={styles.flagImage} />
                <Text style={[styles.countryText, fontLoaded && { fontFamily: 'ncaa' }]}>Americas / Caribbean</Text>
                <Text style={[styles.scoreText, fontLoaded && { fontFamily: 'ncaa' }]}>{numberWithCommas(this.state.americasTotalTeamScore)}</Text>
                </View>
            </TouchableOpacity>
          </View>

        <View style={styles.flagBox}>
            <TouchableOpacity style={styles.leftSide} activeOpacity={.5} onPress={() =>  this.goSouthAmericaMenu()}>
            <View style={styles.playButtonContainerTime}>
                <Image source={southAmerica} style={styles.flagImage} />
                <Text style={[styles.countryText, fontLoaded && { fontFamily: 'ncaa' }]}>South America</Text>
                <Text style={[styles.scoreText, fontLoaded && { fontFamily: 'ncaa' }]}>{numberWithCommas(this.state.southAmericaTotalTeamScore)}</Text>
                </View>
            </TouchableOpacity>
        </View>

        <View style={styles.flagBox}>
            <TouchableOpacity style={styles.leftSide} activeOpacity={.5} onPress={() =>  this.goWesterosMenu()}>
            <View style={styles.playButtonContainerTime}>
                <Image source={westeros} style={styles.flagImage} />
                <Text style={[styles.countryText, fontLoaded && { fontFamily: 'ncaa' }]}>Westeros</Text>
                <Text style={[styles.scoreText, fontLoaded && { fontFamily: 'ncaa' }]}>{numberWithCommas(this.state.westerosTotalTeamScore)}</Text>
                </View>
            </TouchableOpacity>
        </View>

        <View style={styles.flagBox}>
            <TouchableOpacity style={styles.leftSide} activeOpacity={.5} onPress={() =>  this.goAzerothMenu()}>
            <View style={styles.playButtonContainerTime}>
                <Image source={azeroth} style={styles.flagImage} />
                <Text style={[styles.countryText, fontLoaded && { fontFamily: 'ncaa' }]}>Azeroth</Text>
                <Text style={[styles.scoreText, fontLoaded && { fontFamily: 'ncaa' }]}>{numberWithCommas(this.state.azerothTotalTeamScore)}</Text>
                </View>
            </TouchableOpacity>
        </View>

        <View style={styles.flagBox}>
            <TouchableOpacity style={styles.leftSide} activeOpacity={.5} onPress={() =>  this.goTrumpsWallMenu()}>
            <View style={styles.playButtonContainerTime}>
                <Image source={trumpswall} style={styles.flagImage} />
                <Text style={[styles.countryText, fontLoaded && { fontFamily: 'ncaa' }]}>Trumps Wall</Text>
                <Text style={[styles.scoreText, fontLoaded && { fontFamily: 'ncaa' }]}>{numberWithCommas(this.state.TrumpsWallTotalTeamScore)} m</Text>
                </View>
            </TouchableOpacity>
        </View>
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
      fontSize: 32,
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
      fontWeight: 'bold',
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
      fontWeight: 'bold',
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
        shadowOffset : { width: 0, height: 5},
    }
  });

  export default withNavigation(ContinentIndex);
