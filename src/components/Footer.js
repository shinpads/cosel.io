import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import githubIcon from '../../public/github.svg';
import colors from '../colors';

const styles = {
  root: {
    backgroundColor: colors.canvas,
  },
  footerContent: {
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    color: '#000',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    fontWeight: 600,
    color: '#000',
    '@media(max-width: 600px)': {
      fontSize: '1rem',
    },
  },
  socialContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '1rem',
  },
  pages: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    '@media(max-width: 600px)': {
      flexDirection: 'column',
      flexGrow: 1,
    },
  },
  page: {
    margin: '0 1rem',
    color: '#000',
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'all 250ms ease',
    opacity: 1,
    '&:hover': {
      opacity: 0.6,
    },
  },
};

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.root}>
        <div className={classes.footerContent}>
          <div>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <div className={classes.title}>cosel.io</div>
            </NavLink>
          </div>
          <div className={classes.socialContainer}>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/shinpads/cosel.io">
              <img alt="GitHub" width={32} height={32} src={githubIcon} />
            </a>
          </div>
          <div className={classes.pages}>
            <NavLink className={classes.page} to="/about">About</NavLink>
            <NavLink className={classes.page} to="/how-to-play">How To Play</NavLink>
            <NavLink className={classes.page} to="/contact">Contact</NavLink>
            <NavLink className={classes.page} to="/terms-of-service">Terms Of Service</NavLink>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Footer);
