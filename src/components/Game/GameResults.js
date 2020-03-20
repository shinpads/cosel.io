import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import GameChainResult from './GameChainResult';

const styles = {
  root: {

  },
  title: {
    fontSize: '2.5rem',
    paddingLeft: '1rem',
    borderBottom: '1px solid #000',
  },
};

class GameResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { gameChains, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.title}>Results</div>
        {gameChains.map(gc => <GameChainResult gameChain={gc} />)}
      </div>
    );
  }
}

GameResults.propTypes = {
  gameChains: PropTypes.array,
  classes: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    gameChains: state.game.game.gameChains,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(GameResults));
