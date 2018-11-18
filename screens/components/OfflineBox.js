import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
// import CustomBlinkingImage from '../components/CustomBlinkingImage';

const { width } = Dimensions.get('window');

function OfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      {/* <CustomBlinkingImage /> */}
      <Text allowFontScaling={false} style={styles.offlineText}>
        No Internet Connection
      </Text>
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
    backgroundColor: '#FF7900',
    height: 30,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width,
    position: 'absolute',
    top: 30
  },
  offlineText: {
    // color: '#fff',
    color: 'black',
    position: 'absolute',
    bottom: 5
  }
});

export default OfflineBox;
