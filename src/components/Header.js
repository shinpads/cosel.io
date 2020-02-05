import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import colors from '../colors';

const styles = {
  root: {
    height: '100px',
    textAlign: 'center',
  },
  title: {
    margin: '0.5rem',
    fontSize: '64px',
    color: colors.darkGrey,
    fontFamily: "'Didact Gothic', sans-serif",
  },
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { classes } = this.props;
    return (
      <header className={classes.root}>
        <div className={classes.title}>picken.io</div>
      </header>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Header);
