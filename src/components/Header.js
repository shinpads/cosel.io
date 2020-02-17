import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
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
  link: {
    textDecoration: 'none',
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
        <NavLink className={classes.link} to="/">
          <div className={classes.title}>picken.io</div>
        </NavLink>
      </header>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Header);
