import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import colors from '../../colors';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    marginLeft: '0.5rem',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  button: {
    cursor: 'pointer',
    backgroundColor: colors.primaryContrast,
    color: colors.primary,
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    fontWeight: 600,
    outline: 0,
    borderRadius: '0rem 1rem 1rem 0rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem',
    },
    '@media (min-height: 600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      width: 'unset',
      padding: '1rem',
    },
    '@media (max-width: 400px)': {
      padding: '1rem', // old, really small iPhones
    },
  },
  input: {
    outline: 0,
    borderTopLeftRadius: '1rem',
    borderBottomLeftRadius: '1rem',
    border: '2px solid #000',
    flexGrow: 1,
    fontSize: '1.5rem',
    fontFamily: 'coming soon',
    padding: '1rem',
  },
});

class JoinGameButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <input className={classes.input} placeholder="ABC123" />
          <div role="button" onClick={this.copyUrl} tabIndex={0} className={classes.button}>
            Join
          </div>
        </div>
      </>
    );
  }
}

JoinGameButton.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(JoinGameButton);
