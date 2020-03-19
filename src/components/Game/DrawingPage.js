import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import GameArea from '../DrawArea/GameArea';
import { PrimaryButton } from '../Base/Button';


const styles = {
  root: {

  },
  info: {
    display: 'grid',
    padding: '0.5rem',
    width: 'calc(100% - 1rem)',
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  word: {
    fontWeight: 600,
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  round: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

class DrawingPage extends Component {
  componentDidMount() {

  }

  render() {
    const {
      onSubmitDrawing,
      word,
      classes,
      timeRemaining,
      round,
      rounds,
    } = this.props;
    return (
      <>
        <div className={classes.info}>
          <div className={classes.round}>{round}/{rounds}</div>
          <div className={classes.word}>{word}</div>
          <div className={classes.time}>{timeRemaining}s</div>
        </div>
        <GameArea style={{ flexGrow: 1, display: 'flex' }} />
        <PrimaryButton onClick={onSubmitDrawing}>Submit</PrimaryButton>
      </>
    );
  }
}

DrawingPage.propTypes = {
  onSubmitDrawing: PropTypes.func.isRequired,
  word: PropTypes.string.isRequired,
  classes: PropTypes.object,
  timeRemaining: PropTypes.number,
  round: PropTypes.number,
  rounds: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    round: state.game.game.round,
    rounds: state.game.game.round,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(DrawingPage));
