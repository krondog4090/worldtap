import React, { Component } from "react";
import { Text, View, Linking } from "react-native";
import * as firebase from "firebase";
import { Font } from "expo";
import styles from "../src/styles/Styles";

const ncaa = require("../assets/fonts/ncaa.otf");

class CountDownTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  componentWillMount() {
  }

  async componentDidMount() {
    Font.loadAsync({
      ncaa: ncaa
    }).then(() => {
      this.setState({
        fontLoaded: true
      });
    });
  }

  getRef = () => {
    return firebase.database().ref();
  };
  
  render() {
    const { fontLoaded } = this.state;
    return (
      <View style={{ flexDirection: "column", alignItems: "center", justifyContent: 'center'}}>
        <View style={[styles.playButtonContainerTime, { flexDirection: "column", alignItems: "center", shadowOpacity: .2 }]}>
          <Text style={[fontLoaded && { fontFamily: "ncaa", color: "black", fontSize: 14, textAlign: 'center' }]}>
                World Tap is a game where players can play together for their countries and was inspired by the Flappy Bird concept and the help of 
                <Text 
                    style={{color: 'white', textDecorationLine: 'underline'}}
                    onPress={this._openEvanBacon}> Evan Bacons </Text> expo tutorial.
          </Text>
        </View>

        <View style={[styles.playButtonContainerTime, { flexDirection: "column", alignItems: "center", shadowOpacity: .2 }]}>
          <Text style={[fontLoaded && { fontFamily: "ncaa", color: "black", fontSize: 14, textAlign: 'center' }]}>
                Theres a few bugs that Im working on fixing as well as creating new features for the future.
          </Text>
        </View>

        <View style={[styles.playButtonContainerTime, { flexDirection: "column", alignItems: "center", shadowOpacity: .2 }]}>
          <Text style={[fontLoaded && { fontFamily: "ncaa", color: "black", fontSize: 14, textAlign: 'center' }]}>
                This game was made for a winner to be declared at the start of the next World Cup in <Text style={{color: 'red'}}>2022</Text>.
          </Text>
        </View>

        <View style={[styles.playButtonContainerTime, { flexDirection: "column", alignItems: "center", shadowOpacity: .2 }]}>
          <Text style={[fontLoaded && { fontFamily: "ncaa", color: "white", fontSize: 14, textAlign: 'center' }]}>
                GOOD LUCK, TELL YOUR FRIENDS, AND HAVE FUN!
          </Text>
        </View>
      </View>
    );
  }

    _openEvanBacon = () => {
        Linking.openURL('https://twitter.com/baconbrix')
    }

}

export default CountDownTwo;
