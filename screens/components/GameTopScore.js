import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const GameTopScore = (props) => {
  const { hide, children } = props;
  if (hide) {
    return null;
  }
  return <View {...this.props}>{children}</View>;
};

GameTopScore.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]))
  ]).isRequired,
  hide: PropTypes.bool
};

export default GameTopScore;
