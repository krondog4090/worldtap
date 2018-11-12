import React from 'react';
import { Image, Text, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase';
import { Font } from 'expo';
import styles from '../../src/styles/Styles';
import { numberWithCommas, abbreviateNumber } from '../../src/helpers/helpers';

import { 
    addImage,
    subImage } from '../../assets/images/flagimages/FlagImages';

const nbaTrophy = require('../../assets/images/trophy.png');

class TrumpsWallIndex extends React.Component {
  static navigationOptions = {
    header: null,
  };
    constructor(props) {
      super(props);
      this.state = {
        fontLoaded: false,
            TrumpsWallTotalScore:[],
            addTeamScore: [],
            addTrophyCount: [],
            subTeamScore: [],
            subTrophyCount: [],
      };

        this.getTrumpsWallData = this.getTrumpsWallData.bind(this);
        this.getAddData = this.getAddData.bind(this);
        this.getSubData = this.getSubData.bind(this);
        
        this.getTrumpsWallRef = this.getRef().child('World_Teams/TrumpsWall/TrumpsWallTotal/Score');
        this.getAddRef = this.getRef().child('World_Teams/TrumpsWall/TrumpsWallTeams/Add/Score');
        this.getSubRef = this.getRef().child('World_Teams/TrumpsWall/TrumpsWallTeams/Sub/Score');

        this.getAddRefTrophy = this.getRef().child('World_Teams/TrumpsWall/TrumpsWallTeams/Add/TrophyCount');
        this.getSubRefTrophy = this.getRef().child('World_Teams/TrumpsWall/TrumpsWallTeams/Sub/TrophyCount');
    }
  
    componentDidMount() {
      StatusBar.setHidden(false);
      Font.loadAsync({
        'ncaa': require('../../assets/fonts/ncaa.otf')
      }).then(() => {
        this.setState({
          fontLoaded: true,
        });
      })
        this.getTrumpsWallData(this.getTrumpsWallRef);
        this.getAddData(this.getAddRef, this.getAddRefTrophy);
        this.getSubData(this.getSubRef, this.getSubRefTrophy);
    }

  getRef = () => {
      return firebase.database().ref();
  }

  getTrumpsWallData(getTrumpsWallRef) {
      getTrumpsWallRef.on('value', (snap) => {
          this.setState({
              TrumpsWallTotalScore: snap.val()
          });
      });
  }
  getAddData(getAddRef, getAddRefTrophy) {
      getAddRef.on('value', (snap) => {
          this.setState({
              addTeamScore: snap.val()
          });
      });
      getAddRefTrophy.on('value', (snap) => {
          this.setState({
              addTrophyCount: snap.val()
          });
      });
  }
  getSubData(getSubRef, getSubRefTrophy) {
      getSubRef.on('value', (snap) => {
          this.setState({
              subTeamScore: snap.val()
          });
      });
      getSubRefTrophy.on('value', (snap) => {
          this.setState({
              subTrophyCount: snap.val()
          });
      });
  }

  
  goAddTeam = () => {
      this.props.navigation.replace('TrumpsWallMainGameAdd', {
          teamScore: this.state.addTeamScore,
          trophyCount: this.state.addTrophyCount,
          teamImage: addImage,
          teamName: 'YAY',
          countryName: 'Yay',
          teamData: this.getAddData,
          teamRef: this.getRef().child('World_Teams/TrumpsWall/TrumpsWallTeams/Add/Score'),
          teamRefTrophy: this.getRef().child('World_Teams/TrumpsWall/TrumpsWallTeams/Add/TrophyCount'),
          keyTP: 'addTPkey',
      });
  }
  goSubTeam = () => {
      this.props.navigation.replace('TrumpsWallMainGameSub', {
          teamScore: this.state.subTeamScore,
          trophyCount: this.state.subTrophyCount,
          teamImage: subImage,
          teamName: 'NAY',
          countryName: 'Nay',
          teamData: this.getSubData,
          teamRef: this.getRef().child('World_Teams/TrumpsWall/TrumpsWallTeams/Sub/Score'),
          teamRefTrophy: this.getRef().child('World_Teams/TrumpsWall/TrumpsWallTeams/Sub/TrophyCount'),
          keyTP: 'subTPkey',
      });
  }

    render() {
      const { fontLoaded } = this.state;
      return (
        <View style={styles.containerIndex}>
        <View style={styles.eastContainer}>
        <View style={[styles.playButtonContainerTime, {flexDirection: 'column'}]}>
            <Text allowFontScaling={false}style={[styles.eastText, fontLoaded && { fontFamily:'ncaa'}]}>Trumps Wall Height</Text>
            <Text allowFontScaling={false}style={[styles.topScoreText, fontLoaded && { fontFamily: 'ncaa'}]}>{numberWithCommas(this.state.TrumpsWallTotalScore)} m</Text>
        </View>
        </View>
        {/* TEAMS */}
        <ScrollView>
        <View>
          <View style={styles.flagBox}>
            <TouchableOpacity style={styles.buttonIndex} activeOpacity={.5} onPress={() =>  this.goAddTeam()}>
                <Image source={addImage} style={styles.flagImage} />
                <Text allowFontScaling={false}style={[styles.countryText, fontLoaded && { fontFamily: 'ncaa' }]}>Yay</Text>
                <Text allowFontScaling={false}style={[styles.scoreText, fontLoaded && { fontFamily: 'ncaa' }]}>{abbreviateNumber(this.state.addTeamScore)} / 50M</Text>
                <Image style={styles.trophyBox} source={nbaTrophy} />
                <Text allowFontScaling={false}style={[styles.trophyText, fontLoaded && { fontFamily: 'ncaa'}]}>{this.state.addTrophyCount}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.flagBox}>
            <TouchableOpacity style={styles.buttonIndex} activeOpacity={.5} onPress={() =>  this.goSubTeam()}>
                <Image source={subImage} style={styles.flagImage} />
                <Text allowFontScaling={false}style={[styles.countryText, fontLoaded && { fontFamily: 'ncaa' }]}>Nay</Text>
                <Text allowFontScaling={false}style={[styles.scoreText, fontLoaded && { fontFamily: 'ncaa' }]}>{abbreviateNumber(this.state.subTeamScore)} / 50M</Text>
                <Image style={styles.trophyBox} source={nbaTrophy} />
                <Text allowFontScaling={false}style={[styles.trophyText, fontLoaded && { fontFamily: 'ncaa'}]}>{this.state.subTrophyCount}</Text>
            </TouchableOpacity>
          </View>
          
        </View>
        </ScrollView>
      </View>
      );
    }
  }

  export default withNavigation(TrumpsWallIndex);
