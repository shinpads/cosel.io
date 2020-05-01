import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import GameResultBook from './GameResultBook';
import CopyLink from './CopyLink';
import { PrimaryButton } from '../Base/Button';
import history from '../../history';

const styles = {
  root: {
    overflow: 'auto',
  },
  title: {
    fontSize: '2.5rem',
    borderBottom: '1px solid #000',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

class GameResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToNextGame = (hash) => {
    history.push(`/game/${hash}`);
  }

  render() {
    const {
      gameChains,
      classes,
      nextGame,
      view,
    } = this.props;

    let nextGameHash;
    if (nextGame && nextGame.hash) {
      nextGameHash = nextGame.hash;
    }
    return (
      <DocumentTitle title="cosel.io - Waiting for players">
        <div className={classes.root}>
          <CopyLink url={`${window.location.origin}${window.location.pathname}?view=true`} displayUrl={`${window.location.host}${window.location.pathname}`} />
          <h2 className={classes.title}>Results</h2>
          {gameChains.map(gc => <GameResultBook gameChain={gc} />)}
          <div className={classes.buttonContainer}>
            {!view && nextGameHash && <PrimaryButton onClick={() => this.goToNextGame(nextGameHash)}>Continue</PrimaryButton>}
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

GameResults.propTypes = {
  gameChains: PropTypes.array,
  classes: PropTypes.object,
  nextGame: PropTypes.object,
  view: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    gameChains: state.game.game.gameChains,
    nextGame: state.game.game.nextGame,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(GameResults));
