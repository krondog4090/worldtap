import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
import CustomBlinkingImage from '../components/CustomBlinkingImage';

// const { width } = Dimensions.get('window');

function OfflineSign() {
  return <CustomBlinkingImage />;
}
class BlinkingWarningSign extends PureComponent {
  render() {
    if (!this.props.isConnected) {
      return <OfflineSign />;
    }
    return null;
  }
}

export default BlinkingWarningSign;
