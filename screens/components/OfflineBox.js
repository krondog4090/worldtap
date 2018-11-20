import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet, Image } from 'react-native';
import CustomBlinkingImage from '../components/CustomBlinkingImage';
import { withNavigation } from 'react-navigation';

const { width } = Dimensions.get('window');
const warning = require('../../assets/images/warning.png');

function OfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      {/* <Image source={warning} style={styles.warningSign} /> */}
      <CustomBlinkingImage />
      <Text allowFontScaling={false} style={styles.offlineText}>
        No Internet Connection
      </Text>
      <CustomBlinkingImage />
      {/* <Image source={warning} style={styles.warningSign} /> */}
    </View>
  );
}
class OfflineBox extends PureComponent {
  state = {
    isConnected: true
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (isConnected) => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {React.Children.map(this.props.children, (child) =>
          React.cloneElement(child, { isConnected: this.state.isConnected })
        )}
        {!this.state.isConnected ? <OfflineSign /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    flex: 1,
    backgroundColor: '#B33A3A',
    height: 30,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width,
    position: 'absolute',
    top: 30
  },
  offlineText: {
    color: '#fff'
  },
  warningSign: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  }
});

export default withNavigation(OfflineBox);
