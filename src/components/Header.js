import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    textAlign: 'center',
  },
  title: {
    margin: '0.5rem',
    fontSize: '3rem',
    fontWeight: 400,
    color: '#000',
    '@media (min-height: 600px)': {
      fontSize: '5rem',
    },
    '@media (min-width: 960px)': {
      fontSize: '7rem',
    },
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
          <div className={classes.title}>cosel.io</div>
        </NavLink>
      </header>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Header);
