import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Replay from '../Replay';

const styles = {
  gameChainStepsContainer: {
    display: 'flex',
    paddingRight: '2rem',
    width: 'fit-content',
  },
  gameChainContainer: {

  },
  gameStepContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
    margin: '0rem 1rem',
  },
  gameStepTitle: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  gameStepGuess: {
    whiteSpace: 'nowrap',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: '100%',
    height: '2px',
    backgroundColor: '#000',
  }
};

class GameChainResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { gameChain, drawingMap, classes } = this.props;
    return (
      <div className={classes.gameChainContainer}>
        <div style={{ overflow: 'auto' }}>
          <div className={classes.gameChainStepsContainer}>
            <div className={classes.gameStepContainer}>
              <div className={classes.gameStepTitle}>Starting word</div>
              <div className={classes.gameStepGuess}>{gameChain.originalWord}</div>
            </div>
            {gameChain.gameSteps.map(gs => <GameStepResult drawingMap={drawingMap} gameStep={gs} classes={classes} />)}
          </div>
        </div>
      </div>
    );
  }
}

const GameStepResult = ({
  gameStep,
  drawingMap,
  classes,
}) => {
  if (gameStep.type === 'GUESS') {
    return (
      <div className={classes.gameStepContainer}>
        <div className={classes.gameStepTitle}>{gameStep.user.username} guessed</div>
        <div className={classes.gameStepGuess}>{gameStep.guess}</div>
      </div>
    );
  }
  // drawing
  const drawData = drawingMap[String(gameStep.drawing)];
  if (!drawData) {
    return (
      <div className={classes.gameStepContainer}>
        {'Can\'t find drawing'}
      </div>
    );
  }
  return (
    <div className={classes.gameStepContainer}>
      <div className={classes.gameStepTitle}>{gameStep.user.username} drew</div>
      <Replay width={300} drawData={drawData} />
    </div>
  );
};

GameChainResult.propTypes = {
  gameChain: PropTypes.object,
  drawingMap: PropTypes.object,
  classes: PropTypes.object,
};

GameStepResult.propTypes = {
  gameStep: PropTypes.object,
  drawingMap: PropTypes.object,
  classes: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    drawingMap: state.game.drawingMap,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(GameChainResult));
