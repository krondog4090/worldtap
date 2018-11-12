import React from 'react';
import { Share, Platform, Text, View, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import styles from '../../src/styles/Styles';

import { gamefont } from '../../assets/fonts/PressStart2P.ttf';

class ShareIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            urlMessage: '',
            sentSucess: 0,
        }
        this.getUrlMessageData = this.getUrlMessageData.bind(this);
        this.getUrlMessageRef = this.getRef().child('World_Teams/ShareMessage/UrlMessage');
        this.shareMessage = this.shareMessage.bind(this);
    }

    shareMessage() {
        Share.share({
            ...Platform.select({
                ios: {
                    message: `${this.state.countryName} needs more players on World Tap!`,
                    url: `${this.state.urlMessage}`
                },
                android: {
                    message: `${this.state.countryName} needs more players on World Tap!` + this.props.urlMessage
                }
            })
        }).then(({action, activityType}) => {
            if(action === Share.dismissedAction) console.log('Share dismissed');
            else console.log('Share successful');
            this.setState({
                sentSucess: this.state.sentSucess + 1
            })
        });
    }

    async componentDidMount() {
        Font.loadAsync({
            'gamefont': gamefont,
        }).then(() => {
            this.setState({
                fontLoaded: true
            });
        })

        this.getUrlMessageData(this.getUrlMessageRef);
    }

    getRef = () => {
        return firebase.database().ref();
    }

    getUrlMessageData(getUrlMessageRef) {
        getUrlMessageRef.on('value', (snap) => {
            this.setState({
                urlMessage: snap.val()
            });
        });
    }

    render() {
        // const { fontLoaded } = this.state;
        return (
            <View style={{top: this.state.buttonPressedFour ? 2 : 0}}>
            <TouchableOpacity
            style={styles.playButtonContainer}
            onPress={this.shareMessage}
            activeOpacity={10}  
            onPressIn={() => this.setState({buttonPressedFour: true})} 
            onPressOut={() => this.setState({buttonPressedFour: false})}>
            <View style={styles.playButtonContainerTime}>
                <Text allowFontScaling={false}style={[styles.buttonText, { fontFamily: 'gamefont', color: 'grey', fontWeight: 'bold', textShadowColor: 'black', textShadowOffset: {width: 1, height: 2}, textShadowRadius: 1, fontSize: 14}]}>
                    SHARE WITH FRIENDS
                </Text>
            </View>  
            </TouchableOpacity>
            </View>
        );
    }
}

export default ShareIndex;