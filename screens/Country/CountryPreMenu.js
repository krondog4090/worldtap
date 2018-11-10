import { AppLoading } from "expo";
import React from "react";
import arrayFromObject from "../../utils/arrayFromObject";
import cacheAssetsAsync from "../../utils/cacheAssetsAsync";
import CountryFiles from './CountryFiles';
import CountryMenu from "./CountryMenu";


export default class CountryPreMenu extends React.Component {
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
        files: arrayFromObject(CountryFiles)
      });
    } catch (e) {
      console.warn(
        "Country cache didn't work correctly"
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
    <CountryMenu
     /> : <AppLoading />;
  }
}