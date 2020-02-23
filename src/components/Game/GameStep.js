import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { submitStep } from '../../actions/gameActions';
import DrawingPage from '../DrawingPage/DrawingPage';
import Replay from '../Replay';
import { getDrawing } from '../../api';

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
      loadingDrawData: true,
      drawData: null,
    };
  }

  async componentDidMount() {
    const { gameStep, previousGameStep } = this.props;
    if (gameStep.type === 'GUESS') {
      if (previousGameStep && previousGameStep.drawing) {
        const drawData = await getDrawing(previousGameStep.drawing);
        this.setState({ drawData, loadingDrawData: false });
      } else {
        console.error('PREVIOUS GAME STEP DOESNT HAVE DRAWING');
      }
    }
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
    gameStep.drawData = window.drawData;
    dispatch(submitStep(gameStep));
    this.setState({ submitted: true });
  }

  render() {
    const {
      gameStep,
      previousGameStep,
      classes,
      gameChain,
    } = this.props;
    const {
      guess,
      submitted,
      loadingDrawData,
      drawData,
    } = this.state;
    if (submitted) {
      return (
        <div>waiting for other players to submit</div>
      );
    }
    if (gameStep.type === 'GUESS') {
      return (
        <div className={classes.root}>
          <div>Guess what {previousGameStep.user.username} drew</div>
          {loadingDrawData && <div>Loading...</div>}
          {!loadingDrawData && <Replay width={300} drawData={drawData} />}
          <TextField label="guess" value={guess} onChange={e => this.setState({ guess: e.target.value })} />
          <Button onClick={this.onSubmitGuess}>Submit</Button>
        </div>
      );
    }

    if (gameStep.type === 'DRAWING') {
      return (
        <div className={classes.root}>
          <DrawingPage onSubmitDrawing={this.onSubmitDrawing} word={previousGameStep ? previousGameStep.guess : gameChain.originalWord} />
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
};

export default connect()(withStyles(styles)(GameStep));
