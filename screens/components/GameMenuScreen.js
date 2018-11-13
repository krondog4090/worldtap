import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';

const GameMenuScreen = (props) => {
  const { hide, children } = props;
  if (hide) {
    return null;
  }
  return (
    <SafeAreaView
      style={{
        position: 'absolute',
        zIndex: 1000,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      {...this.props}
    >
      {children}
    </SafeAreaView>
  );
};

GameMenuScreen.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]))
  ]).isRequired,
  hide: PropTypes.bool
};

export default GameMenuScreen;
