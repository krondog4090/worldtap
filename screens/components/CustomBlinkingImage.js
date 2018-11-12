import React, { Component } from 'react';
import { Image } from 'react-native';
import styles from '../../src/styles/Styles';

const offline = require('../../assets/images/offlineWifiIcon.png');

class CustomBlinkingImage extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.setState((state) => {
        return {
          visible: !state.visible
        };
      });
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  render() {
    if (this.state.visible) {
      return <Image source={offline} style={styles.flagImageCount} />;
    } else {
      return null;
    }
  }
}

export default CustomBlinkingImage;
