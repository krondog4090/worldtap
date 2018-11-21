import { AppLoading } from 'expo';
import React from 'react';
import arrayFromObject from '../../utils/arrayFromObject';
import cacheAssetsAsync from '../../utils/cacheAssetsAsync';
// import Files from '../../Files';
import TrumpsWallFiles from './TrumpsWallFiles';
import TrumpsWallGameAdd from './TrumpsWallGameAdd';

export default class TrumpsWallMainGameAdd extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      assetsLoaded: false,
      teamName: this.props.navigation.state.params.teamName,
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
        files: arrayFromObject(TrumpsWallFiles)
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
      <TrumpsWallGameAdd
        {...this.props}
        teamName={this.state.teamName}
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
