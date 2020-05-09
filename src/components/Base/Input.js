import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import colors from '../../colors';

const styles = {
  input: {
    fontSize: '1.5rem',
    padding: '0.5rem',
    width: 'calc(100% - 1rem)',
    fontWeight: 600,
    border: 0,
    outline: 0,
    borderBottomColor: colors.primaryContrast,
    fontFamily: 'Coming Soon',
    '&::placeholder': {
    },
    '&:error': {

    },
  },
  label: {
    fontSize: '1.5rem',
  },
  secondaryLabel: {
    padding: '4px',
    paddingBottom: 0,
  },
  primaryInput: {
    backgroundColor: colors.primary,
    color: colors.primaryContrast,
    borderBottom: '1px solid',
    paddingBottom: '0rem',
  },
  secondaryInput: {
    color: colors.primaryContrast,
    backgroundColor: colors.lightGrey,
    borderRadius: '4px',
  },
  primaryTextArea: {
    resize: 'none',
    backgroundColor: colors.lightGrey,
    borderRadius: '4px',
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

export const SecondaryInput = withStyles(styles)((props) => {
  const {
    classes,
    label,
    labelStyle,
    className,
  } = props;
  return (
    <label className={`${classes.label} ${classes.secondaryLabel} ${labelStyle || ''}`}>
      {label}
      <input
        type="text"
        {...props}
        className={`${classes.input} ${classes.secondaryInput} ${className || ''}`}
      />
    </label>
  );
});

export const PrimaryTextArea = withStyles(styles)((props) => {
  const {
    classes,
    label,
    labelStyle,
    className,
  } = props;
  return (
    <label className={`${classes.label} ${labelStyle || ''}`}>
      {label}
      <textarea
        type="text"
        {...props}
        className={`${classes.input} ${classes.primaryTextArea} ${className || ''}`}
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
