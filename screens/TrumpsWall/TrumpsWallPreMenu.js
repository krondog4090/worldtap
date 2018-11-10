import { AppLoading } from "expo";
import React from "react";
import arrayFromObject from "../../utils/arrayFromObject";
import cacheAssetsAsync from "../../utils/cacheAssetsAsync";
import TrumpsWallFiles from './TrumpsWallFiles';
import TrumpsWallMenu from "./TrumpsWallMenu";


export default class TrumpsWallPreMenu extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      assetsLoaded: false,
    }
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
        "TrumpsWall cache didn't work correctly"
      );
      console.log(e.message);
    } finally {
      this.setState({ 
        assetsLoaded: true 
      });
    }
  };

  render() {
    return this.state.assetsLoaded ? 
    <TrumpsWallMenu
     /> : <AppLoading />;
  }
}