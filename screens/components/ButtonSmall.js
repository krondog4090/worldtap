import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styles from '../../src/styles/Styles';

const ButtonSmall = (props) => {
  const { hide, onPress, children, onPressIn, onPressOut } = props;
  if (hide) {
    return null;
  }
  return (
    <TouchableOpacity onPress={onPress}
                    activeOpacity={10} 
                    style={styles.playButtonContainer} 
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}>
        {children}
    </TouchableOpacity>
  );
};

ButtonSmall.propTypes = {
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

export default ButtonSmall;