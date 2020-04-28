import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import colors from '../../colors';

const styles = theme => ({
  button: {
    width: '100%',
    fontSize: '1.5rem',
    padding: '1.5rem',
    fontWeight: 600,
    border: '2px solid',
    cursor: 'pointer',
    textTransform: 'uppercase',
    margin: '1rem',
    borderRadius: '2rem',
    outline: 0,
    userSelect: 'none',
    fontFamily: 'coming soon',
    '@media (min-height: 600px)': {
      fontSize: '2rem',
    },
    [theme.breakpoints.up('md')]: {
      width: 'unset',
      border: '2px solid',
      padding: '1.5rem 8rem',
    },
    '@media (max-width: 400px)': {
      padding: '1rem', // old, really small iPhones
    }
  },
  primaryButton: {
    color: colors.primaryContrast,
    backgroundColor: colors.primary,
    transition: 'all 250ms ease',
    '&:hover': {
      color: colors.primary,
      backgroundColor: colors.primaryContrast,
    },
    [theme.breakpoints.up('md')]: {
    },
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    color: colors.secondaryContrast,
  },
});

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
