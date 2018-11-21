import { AppLoading } from 'expo';
import React from 'react';
import arrayFromObject from '../../utils/arrayFromObject';
import cacheAssetsAsync from '../../utils/cacheAssetsAsync';
import CountryFiles from './CountryFiles';
import CountryGame from './CountryGame';

export default class CountryMainGame extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      continentName: this.props.navigation.state.params.continentName,
      continentImage: this.props.navigation.state.params.continentImage,
      assetsLoaded: false,
      // teamName: this.props.navigation.state.params.teamName,
      countryName: this.props.navigation.state.params.countryName,
      teamImage: this.props.navigation.state.params.teamImage,
      teamScore: this.props.navigation.state.params.teamScore,
      teamData: this.props.navigation.state.params.teamData,
      teamRef: this.props.navigation.state.params.teamRef,
      teamRefTrophy: this.props.navigation.state.params.teamRefTrophy,
      keyTP: this.props.navigation.state.params.keyTP,
      keyHL: this.props.navigation.state.params.keyHL
    };
  }

  componentWillMount() {
    this.loadAssetsAsync();
  }

  loadAssetsAsync = async () => {
    try {
      await cacheAssetsAsync({
        files: arrayFromObject(CountryFiles)
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: app.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({
        assetsLoaded: true
      });
    }
  };

  render() {
    return this.state.assetsLoaded ? (
      <CountryGame
        {...this.props}
        continentName={this.state.continentName}
        continentImage={this.state.continentImage}
        // teamName={this.state.teamName}
        countryName={this.state.countryName}
        teamImage={this.state.teamImage}
        teamScore={this.state.teamScore}
        teamData={this.state.teamData}
        teamRef={this.state.teamRef}
        teamRefTrophy={this.state.teamRefTrophy}
        keyTP={this.state.keyTP}
        keyHL={this.state.keyHL}
      />
    ) : (
      <AppLoading />
    );
  }
}
