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

  onSubmit = () => {
    const { dispatch, gameStep } = this.props;
    const { guess } = this.state;
    gameStep.guess = guess;
    dispatch(submitStep(gameStep));
    this.setState({ submitted: true });
  }

  render() {
    const { gameStep, previousGameStep, classes } = this.props;
    const { guess, submitted } = this.state;
    if (submitted) {
      return (
        <div>waiting for other players to submit</div>
      );
    }
    return (
      <div className={classes.root}>
        <TextField label="guess" value={guess} onChange={e => this.setState({ guess: e.target.value })} />
        <Button onClick={this.onSubmit}>Submit</Button>
        <GameArea />
      </div>
    );
  }
}

GameStep.propTypes = {
  gameStep: PropTypes.object,
  previousGameStep: PropTypes.object,
  classes: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect()(withStyles(styles)(GameStep));
