import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Fade from 'react-reveal/Fade';
// import Flip from 'react-reveal/Flip';
import { withStyles } from '@material-ui/core/styles';

import GameArea from '../components/DrawArea/GameArea';
import Header from '../components/Header';
import WaitingToStart from '../components/Game/WaitingToStart';
import { findGame } from '../actions/gameActions';

const styles = {
  main: {
    fontSize: '22px',
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

  render() {
    const {
      classes,
      loaded,
      error,
      game,
    } = this.props;

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

    // LOADED
    return (
      <div>
        <Header />
        <main className={classes.main}>
          {game.state === 'PRE_START' && <WaitingToStart />}
          <GameArea />
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
};

function mapStateToProps(state) {
  return {
    loaded: state.game.loaded && state.user.loaded,
    error: state.game.error,
    game: state.game.game,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Game));
