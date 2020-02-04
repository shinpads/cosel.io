import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Fade from 'react-reveal/Fade';
// import Flip from 'react-reveal/Flip';
import { withStyles } from '@material-ui/core/styles';

import GameArea from '../components/DrawArea/GameArea';
import Header from '../components/Header';
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
    const { classes, game } = this.props;
    // LOADING
    if (!game.loaded) {
      return (
        <div>
          <Header />
          <div>
            Loading...
          </div>
        </div>
      );
    }

    // LOADED
    return (
      <div>
        <Header />
        <main className={classes.main}>
          {game.error && 'Game not found'}
          {!game.error && `Game with hash ${game.game.hash} found`}
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
};

function mapStateToProps(state) {
  return {
    game: state.game,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Game));
