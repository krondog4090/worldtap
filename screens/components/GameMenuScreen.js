
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const GameMenuScreen = (props) => {
  const { hide, children } = props;
  if (hide) {
    return null;
  }
  return (
    <View style={{position: 'absolute', zIndex: 1000, width: '100%', alignItems: 'center', justifyContent: 'center'}} {...this.props}>
        { children }
    </View>
  );
};

GameMenuScreen.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.element,
        ])),
      ]).isRequired,
    hide: PropTypes.bool,
};


export default GameMenuScreen;