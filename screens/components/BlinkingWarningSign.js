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

// const styles = StyleSheet.create({
//   offlineContainer: {
//     backgroundColor: '#b52424',
//     height: 60,
//     padding: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     width,
//     position: 'absolute',
//     top: 30
//   },
//   offlineText: {
//     color: '#fff',
//     position: 'absolute',
//     bottom: 5
//   }
// });

export default BlinkingWarningSign;
