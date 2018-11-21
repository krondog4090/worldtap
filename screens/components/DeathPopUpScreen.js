import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View } from 'react-native';

const DeathPopUpScreen = (props) => {
  const { children } = props;
  return (
    <View
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
    </View>
  );
};

DeathPopUpScreen.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]))
  ]).isRequired,
  hide: PropTypes.bool
};

export default DeathPopUpScreen;
