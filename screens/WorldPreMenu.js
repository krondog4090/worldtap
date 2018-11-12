import { AppLoading } from 'expo';
import React from 'react';
import arrayFromObject from '../utils/arrayFromObject';
import cacheAssetsAsync from '../utils/cacheAssetsAsync';
import WorldFiles from './WorldFiles';
import WorldMenu from './WorldMenu';

export default class WorldPreMenu extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      assetsLoaded: false
    };
  }

  componentWillMount() {
    this.loadAssetsAsync();
  }

  loadAssetsAsync = async () => {
    try {
      await cacheAssetsAsync({
        files: arrayFromObject(WorldFiles)
      });
    } catch (e) {
      console.warn("cache didn't work correctly");
      console.log(e.message);
    } finally {
      this.setState({
        assetsLoaded: true
      });
    }
  };

  render() {
    return <WorldMenu />;
  }
}
