import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Fade from 'react-reveal/Fade';
// import Flip from 'react-reveal/Flip';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

import Header from '../components/Header';
import WaitingToStart from '../components/Game/WaitingToStart';
import GameStep from '../components/Game/GameStep';
import GameResults from '../components/Game/GameResults';
import { findGame } from '../actions/gameActions';
import { setUsername } from '../actions/userActions';

const styles = {
  main: {
    fontSize: '22px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    const { match, dispatch } = this.props;
    const { hash } = match.params;
    dispatch(findGame(hash));
  }

  submitUsername = () => {
    const { dispatch } = this.props;
    const { username } = this.state;
    dispatch(setUsername(username));
  }

  render() {
    const {
      classes,
      loaded,
      error,
      game,
      userId,
      showUsernameNotSet,
    } = this.props;
    let gameStep;
    let previousGameStep;
    let gameChain;
    // LOADING
    if (!loaded) {
      return (
        <div>
          <Header />
          <div>
            Loading...
          </div>
        </div>
      );
    }

    if (game.state === 'IN_PROGRESS') {
      // find gameStep
      if (game.gameChains && game.gameChains.length) {
        game.gameChains.forEach(gc => {
          if (gc.gameSteps && gc.gameSteps.length) {
            if (gc.gameSteps[gc.gameSteps.length - 1].user._id === userId) {
              gameStep = gc.gameSteps[gc.gameSteps.length - 1];
              previousGameStep = gc.gameSteps[gc.gameSteps.length - 2];
              gameChain = gc;
            }
          }
        });
      }
    }

    // ERROR
    if (error) {
      return (
        <div>
          <Header />
          <div>
            Error finding this game
          </div>
        </div>
      );
    }

    if (showUsernameNotSet) {
      const { username } = this.state;
      return (
        <div>
          <Header />
          <div>
            <form onSubmit={e => { e.preventDefault(); this.submitUsername(); }}>
              <TextField label="username" value={username || ''} onChange={e => this.setState({ username: e.currentTarget.value })} />
              <Button onClick={this.submitUsername}>join game</Button>
            </form>
          </div>
        </div>
      );
    }

    // LOADED
    return (
      <div className={classes.root}>
        <Header />
        <main className={classes.main}>
          <div>Round: {game.round} / {game.rounds}</div>
          {game.state === 'PRE_START' && <WaitingToStart />}
          {game.state === 'IN_PROGRESS' && gameStep && <GameStep key={gameStep._id} gameStep={gameStep} previousGameStep={previousGameStep} gameChain={gameChain} />}
          {game.state === 'COMPLETE' && <GameResults />}
        </main>
      </div>
    );
  }
}

Game.propTypes = {
  classes: PropTypes.object,
  match: PropTypes.object,
  game: PropTypes.object,
  dispatch: PropTypes.func,
  loaded: PropTypes.bool,
  error: PropTypes.bool,
  userId: PropTypes.string,
  showUsernameNotSet: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    loaded: state.game.loaded && state.user.loaded,
    error: state.game.error,
    game: state.game.game,
    showUsernameNotSet: state.game.showUsernameNotSet,
    userId: state.user.user._id,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Game));
