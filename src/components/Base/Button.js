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
    backgroundColor: colors.primaryContrast,
    color: colors.primary,
    '&:hover': {
      backgroundColor: colors.primary,
      color: colors.primaryContrast,
    },
    '@media (min-height: 600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      width: 'unset',
      border: '2px solid',
      padding: '1rem 4rem',
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
  smallButton: {
    fontSize: '1.5rem',
    margin: '1rem 0rem',
    padding: '0.5rem 4rem',
    borderRadius: '0.5rem',
    border: '2px solid',
    color: colors.primary,
    backgroundColor: colors.primaryContrast,
    width: 'unset',
    opacity: 1,
    '&:hover': {
      opacity: 0.65,
    },
  },
});

export const PrimaryButton = withStyles(styles)((props) => {
  const { classes, children, className } = props;
  return (
    <button type="button" {...props} disableRipple className={`${classes.button} ${classes.primaryButton} ${className || ''}`}>{children}</button>
  );
});

export const SmallButton = withStyles(styles)((props) => {
  const { classes, children, className } = props;
  return (
    <button type="button" {...props} disableRipple className={`${classes.button} ${classes.smallButton} ${className || ''}`}>{children}</button>
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
