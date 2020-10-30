import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Fade from 'react-reveal/Fade';
// import Flip from 'react-reveal/Flip';
import { withStyles } from '@material-ui/core/styles';
import queryString from 'query-string';

import Header from '../components/Header';
import WaitingToStart from '../components/Game/WaitingToStart';
import WaitingForGame from '../components/Game/WaitingForGame';
import GameStep from '../components/Game/GameStep';
import GameResults from '../components/Game/GameResults';
import { findGame } from '../actions/gameActions';
import { Spinner } from '../components/Base/Loader';
import SetUsername from '../components/Game/SetUsername';
import { playVideoAd, BannerAd } from '../components/Ads/Ad';

const styles = {
  main: {
    fontSize: '22px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  root: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    maxWidth: '970px',
    margin: '0 auto',
  },
  loader: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
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
    const {
      match,
      dispatch,
      isFirstPage,
      location,
    } = this.props;
    const { hash } = match.params;
    const query = queryString.parse(location.search);

    dispatch(findGame(hash.toUpperCase()));
    if (!isFirstPage && !query.view) {
      playVideoAd();
    }
  }

  render() {
    const {
      classes,
      loaded,
      error,
      game,
      userId,
      showUsernameNotSet,
      location,
      videoAdShowing,
    } = this.props;
    let gameStep;
    let previousGameStep;
    let gameChain;
    let isWaiting = false;

    if (videoAdShowing) {
      return (
        <div>
          <Header />
        </div>
      );
    }

    const query = queryString.parse(location.search);
    // ERROR
    if (error) {
      return (
        <div className={classes.root}>
          <Header />
          <div>
            Error finding this game
          </div>
        </div>
      );
    }

    // LOADING
    if (!loaded) {
      return (
        <div className={classes.loader}>
          <Spinner />
        </div>
      );
    }

    if (game.state === 'IN_PROGRESS') {
      if (game.playersWaiting && game.playersWaiting.length) {
        if (game.playersWaiting.findIndex(u => u._id === userId) !== -1) {
          isWaiting = true;
        }
      }
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

    if (showUsernameNotSet && !query.view) {
      return (
        <div className={classes.root}>
          <Header />
          <SetUsername username={query.name} />
        </div>
      );
    }
    if (isWaiting) {
      return (
        <div className={classes.root}>
          <Header minimizable />
          <main>
            <WaitingForGame />
          </main>
          <BannerAd />
        </div>
      );
    }
    // LOADED
    return (
      <div className={classes.root}>
        <Header minimizable small />
        <main className={classes.main}>
          {game.state === 'PRE_START' && <WaitingToStart />}
          {game.state === 'IN_PROGRESS' && gameStep && <GameStep key={gameStep._id} gameStep={gameStep} previousGameStep={previousGameStep} gameChain={gameChain} />}
          {game.state === 'COMPLETE' && <GameResults view={query.view} />}
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
  location: PropTypes.object,
  videoAdShowing: PropTypes.bool,
  isFirstPage: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    loaded: state.game.loaded && state.user.loaded,
    error: state.game.error,
    game: state.game.game,
    showUsernameNotSet: state.game.showUsernameNotSet,
    userId: state.user.user._id,
    videoAdShowing: state.ads.videoAdShowing,
    isFirstPage: state.ads.isFirstPage,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Game));
