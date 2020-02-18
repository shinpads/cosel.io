import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { submitStep } from '../../actions/gameActions';
import GameArea from '../DrawArea/GameArea';


const styles = {
  root: {
  },
};

class GameStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: '',
      submitted: false,
    };
  }

  onSubmitGuess = () => {
    const { dispatch, gameStep } = this.props;
    const { guess } = this.state;
    gameStep.guess = guess;
    dispatch(submitStep(gameStep));
    this.setState({ submitted: true });
  }

  onSubmitDrawing = () => {
    const { dispatch, gameStep } = this.props;
    const { guess } = this.state;
    gameStep.guess = guess;
    dispatch(submitStep(gameStep));
    this.setState({ submitted: true });
  }

  render() {
    const {
      gameStep,
      previousGameStep,
      classes,
      gameChain,
      users,
    } = this.props;
    const { guess, submitted } = this.state;
    if (submitted) {
      return (
        <div>waiting for other players to submit</div>
      );
    }
    if (gameStep.type === 'GUESS') {
      const prevUser = users.find(user => user._id === previousGameStep.user);
      return (
        <div className={classes.root}>
          <div>Guess what {prevUser.username} drew</div>
          <TextField label="guess" value={guess} onChange={e => this.setState({ guess: e.target.value })} />
          <Button onClick={this.onSubmitGuess}>Submit</Button>
        </div>
      );
    }

    if (gameStep.type === 'DRAWING') {
      return (
        <div className={classes.root}>
          <div>{`Draw "${previousGameStep ? previousGameStep.guess : gameChain.originalWord}"`}</div>
          <GameArea />
          <Button onClick={this.onSubmitDrawing}>Submit</Button>
        </div>
      );
    }
    return <div />;
  }
}

GameStep.propTypes = {
  gameStep: PropTypes.object,
  previousGameStep: PropTypes.object,
  classes: PropTypes.object,
  dispatch: PropTypes.func,
  gameChain: PropTypes.object,
  users: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    users: state.game.game.users,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(GameStep));
