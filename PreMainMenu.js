import { AppLoading } from 'expo';
import React from 'react';
import arrayFromObject from './utils/arrayFromObject';
import cacheAssetsAsync from './utils/cacheAssetsAsync';
import MainMenu from './MainMenu';
import Files from './Files';

export default class PreMainMenu extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      assetsLoaded: true
    };
  }

  componentWillMount() {
    this.loadAssetsAsync();
  }

  loadAssetsAsync = async () => {
    try {
      await cacheAssetsAsync({
        files: arrayFromObject(Files)
      });
    } catch (e) {
      console.warn("mainMenu cache didn't work correctly");
    } finally {
      this.setState({
        assetsLoaded: true
      });
    }
  };

  render() {
    return this.state.assetsLoaded ? <MainMenu /> : <AppLoading />;
  }
}
