
import React from 'react';
import PropTypes from 'prop-types';
// import { View } from 'react-native';
import CountDown from '../CountDown';

const CountDownScreen = (props) => {
  const { hide, children, deadline } = props;
  if (hide) {
    return null;
  }
  return (
    <CountDown deadline={`${'November, 21, 2022'}`} style={{position: 'absolute', zIndex: 1000, width: '100%', alignItems: 'center', justifyContent: 'center'}} {...this.props}>
        {/* { children } */}
    </CountDown>
  );
};

CountDownScreen.propTypes = {
    // children: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.element,
    //     PropTypes.number,
    //     PropTypes.arrayOf(PropTypes.oneOfType([
    //       PropTypes.string,
    //       PropTypes.number,
    //       PropTypes.element,
    //     ])),
    //   ]).isRequired,
    hide: PropTypes.bool,
    deadline: PropTypes.string
};


export default CountDownScreen;