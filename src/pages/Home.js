import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import Fade from 'react-reveal/Fade';
// import Flip from 'react-reveal/Flip';
import { withStyles } from '@material-ui/core/styles';

// import colors from '../colors';
import { createGame, findGame } from '../actions/gameActions';
import { PrimaryButton } from '../components/Base/Button';

import Header from '../components/Header';

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    fontSize: '22px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  info: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    window.scrollTo(0, 0);
  }

  componentDidMount() {
  }

  createNewGame = () => {
    const { dispatch } = this.props;
    dispatch(createGame());
  }

  findGame = () => {
    const { dispatch } = this.props;
    dispatch(findGame());
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <main className={classes.main}>
          <div className={classes.info}>
            <div style={{ textAlign: 'center' }}>Draw a picture and have other people guess it</div>
          </div>
          <PrimaryButton variant="contained" onClick={this.createNewGame}>Create Game</PrimaryButton>
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object,
  dispatch: PropTypes.func,
};

export default withStyles(styles)(Home);
