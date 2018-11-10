import React from 'react';
import { Platform } from 'react-native';
import * as firebase from 'firebase';
import { AdMobBanner } from 'expo';

class AdMobBannerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ios: '',
            android: ''
        }
        this.getIosAdData = this.getIosAdData.bind(this);
        this.getAndroidAdData = this.getAndroidAdData.bind(this);

        this.getIosAdRef = this.getRef().child('World_Teams/Admob/AdUnitID/iOS');
        this.getAndroidAdRef = this.getRef().child('World_Teams/Admob/AdUnitID/Android');
    }

    async componentDidMount() {
        this.getIosAdData(this.getIosAdRef);
        this.getAndroidAdData(this.getAndroidAdRef);
    }

    getRef = () => {
        return firebase.database().ref();
    }

    getIosAdData(getIosAdRef) {
        getIosAdRef.on('value', (snap) => {
            this.setState({
                ios: snap.val()
            });
        });
    }

    getAndroidAdData(getAndroidAdRef) {
        getAndroidAdRef.on('value', (snap) => {
            this.setState({
                android: snap.val()
            });
        });
    }

    render() {
        const BANNER_ID = {
            banner: Platform.select({
              ios: this.state.ios,
              android: this.state.android,
            }),
        }
        return (
            <AdMobBanner
                bannerSize='banner'
                adUnitID={BANNER_ID.banner}
                didFailToReceiveAdWithError={this.bannerError}
            />
        );
    }
}

export default AdMobBannerComponent;

