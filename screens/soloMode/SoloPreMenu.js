import { AppLoading } from 'expo';
import React from 'react';
import arrayFromObject from '../../utils/arrayFromObject';
import cacheAssetsAsync from '../../utils/cacheAssetsAsync';
import Files from './Files';
import Game from './Game';

export default class SoloPreMenu extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      keyTP: this.props.navigation.state.params.keyTP
    }
  }
  state = { assetsLoaded: false };

  componentWillMount() {
    this.loadAssetsAsync();
  }

  loadAssetsAsync = async () => {
    try {
      await cacheAssetsAsync({
        files: arrayFromObject(Files),
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: app.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({ assetsLoaded: true });
    }
  };

  render() {
    return this.state.assetsLoaded ? 
    <Game
    {...this.props}
    keyTP={this.state.keyTP}
    /> : <AppLoading />;
  }
}