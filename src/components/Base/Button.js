import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import colors from '../../colors';

const styles = {
  button: {
    width: '100%',
    fontSize: '2.5rem',
    padding: '2rem',
    fontWeight: 600,
    border: 0,
    textTransform: 'uppercase',
  },
  primaryButton: {
    color: colors.primary,
    backgroundColor: colors.primaryContrast,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    color: colors.secondaryContrast,
  },
};

export const PrimaryButton = withStyles(styles)((props) => {
  const { classes, children } = props;
  const { className } = props;
  return (
    <button type="button" {...props} disableRipple className={`${classes.button} ${classes.primaryButton} ${className || ''}`}>{children}</button>
  );
});

export const SecondaryButton = withStyles(styles)((props) => {
  const { classes, children } = props;
  const { className } = props;
  return (
    <button type="button" {...props} disableRipple className={`${classes.button} ${classes.secondaryButton} ${className || ''}`}>{children}</button>
  );
});

PrimaryButton.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.object,
  className: PropTypes.string,
};
