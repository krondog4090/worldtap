
import React, { Linking } from 'react';
import PropTypes from 'prop-types';
// import { View } from 'react-native';
import CountDownTwo from '../CountDownTwo';

const CountDownScreenTwo = (props) => {
  const { hide, children } = props;
  if (hide) {
    return null;
  }
  return (
    <CountDownTwo style={{position: 'absolute', zIndex: 1000, width: '100%', alignItems: 'center', justifyContent: 'center'}} {...this.props}>
        {/* { children } */}
    </CountDownTwo>
  );
};

CountDownScreenTwo.propTypes = {
    // children: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.element,
    //     PropTypes.number,
    //     PropTypes.arrayOf(PropTypes.oneOfType([
    //       PropTypes.string,
    //       PropTypes.number,
    //       PropTypes.element,
    //       PropTypes.onPress
    //     ])),
    //   ]).isRequired,
    hide: PropTypes.bool
};


export default CountDownScreenTwo;