import React, { PureComponent } from 'react';
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
