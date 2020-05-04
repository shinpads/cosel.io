import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import colors from '../../colors';

const styles = theme => ({
  button: {
    width: '100%',
    fontSize: '1.5rem',
    fontWeight: 600,
    cursor: 'pointer',
    outline: 0,
    userSelect: 'none',
    fontFamily: 'coming soon',
    color: colors.primaryContrast,
    transition: 'all 250ms ease',
  },
  primaryButton: {
    textTransform: 'uppercase',
    margin: '1rem',
    padding: '1.5rem',
    borderRadius: '1rem',
    border: '2px solid',
    backgroundColor: colors.primary,
    '&:hover': {
      color: colors.primary,
      backgroundColor: colors.primaryContrast,
    },
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
    },
  },
  secondaryButton: {
    border: 'none',
    background: 'none',
    padding: 0,
    margin: 0,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    opacity: 1,
    '&:hover': {
      opacity: '0.65',
    },
  },

  arrow: {
    fontSize: '2rem',
    marginLeft: '0.5rem',
    lineHeight: '2px',
  },
});

export const PrimaryButton = withStyles(styles)((props) => {
  const { classes, children, className } = props;
  return (
    <button type="button" {...props} disableRipple className={`${classes.button} ${classes.primaryButton} ${className || ''}`}>{children}</button>
  );
});

export const SecondaryButton = withStyles(styles)((props) => {
  const { classes, title, className } = props;
  return (
    <button type="button" {...props} disableRipple className={`${classes.button} ${classes.secondaryButton} ${className || ''}`}>
      <div>{title}</div>
      <div className={classes.arrow}>{'>'}</div>
    </button>
  );
});

PrimaryButton.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.object,
  className: PropTypes.string,
};

SecondaryButton.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  className: PropTypes.string,
};
