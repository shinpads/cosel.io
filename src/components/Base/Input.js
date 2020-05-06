import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import colors from '../../colors';

const styles = {
  input: {
    fontSize: '1.5rem',
    padding: '0.5rem',
    paddingBottom: '0rem',
    width: 'calc(100% - 1rem)',
    fontWeight: 600,
    border: 0,
    outline: 0,
    borderBottom: '1px solid',
    borderBottomColor: colors.primaryContrast,
    fontFamily: 'Coming Soon',
    '&::placeholder': {
    },
  },
  label: {
    fontSize: '1.5rem',
  },
  primaryInput: {
    backgroundColor: colors.primary,
    color: colors.primaryContrast,
  },
};

export const PrimaryInput = withStyles(styles)((props) => {
  const {
    classes,
    label,
    labelStyle,
    className,
  } = props;
  return (
    <label className={`${classes.label} ${labelStyle || ''}`}>
      {label}
      <input
        type="text"
        {...props}
        className={`${classes.input} ${classes.primaryInput} ${className || ''}`}
      />
    </label>
  );
});

PrimaryInput.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.string,
};

export default PrimaryInput;
