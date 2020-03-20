import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { submitStep } from '../../actions/gameActions';
import DrawingPage from './DrawingPage';
import Replay from '../Replay';
import { getDrawing } from '../../api';
import { PrimaryButton } from '../Base/Button';
import { PrimaryInput } from '../Base/Input';

const styles = {
  replayContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
  },
  info: {
    display: 'grid',
    padding: '0.5rem',
    width: 'calc(100% - 1rem)',
    gridTemplateColumns: '2fr 1fr',
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
      timeRemaining: 0,
    };
  }

  async componentDidMount() {
    const {
      gameStep,
      previousGameStep,
      guessTimeLimit,
      drawTimeLimit,
    } = this.props;
    if (gameStep.type === 'GUESS') {
      // get drawing
      if (previousGameStep && previousGameStep.drawing) {
        const drawData = await getDrawing(previousGameStep.drawing);
        this.setState({ drawData, loadingDrawData: false });
      } else {
        console.error('PREVIOUS GAME STEP DOESNT HAVE DRAWING');
      }
      this.setState({ timeRemaining: guessTimeLimit });
    } else if (gameStep.type === 'DRAWING') {
      this.setState({ timeRemaining: drawTimeLimit });
    }
    this.interval = setInterval(() => {
      this.setState(prevState => {
        if (prevState.timeRemaining <= 1) {
          this.submitGameStep();
          if (this.interval) clearInterval(this.interval);
        }
        return { timeRemaining: prevState.timeRemaining - 1 };
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
    if (this.timeout) clearTimeout(this.timeout);
  }

  submitGameStep = () => {
    const { gameStep } = this.props;
    if (this.timeout) clearTimeout(this.timeout);
    if (gameStep.type === 'GUESS') {
      this.onSubmitGuess();
    } else if (gameStep.type === 'DRAWING') {
      this.onSubmitDrawing();
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
      gameChain,
      classes,
    } = this.props;
    const {
      guess,
      submitted,
      loadingDrawData,
      drawData,
      timeRemaining,
    } = this.state;
    if (submitted) {
      return (
        <div>waiting for other players to submit</div>
      );
    }
    if (gameStep.type === 'GUESS') {
      return (
        <>
          <div className={classes.info}>
            <div>{previousGameStep.user.username} drew:</div>
            <div style={{ textAlign: 'right' }}>{timeRemaining}s</div>
          </div>
          {loadingDrawData && <div>Loading...</div>}
          {!loadingDrawData && (
            <div className={classes.replayContainer}>
              <Replay drawData={drawData} />
            </div>
          )}
          <div style={{ margin: '1rem 2rem' }}>
            <PrimaryInput placeholder="Guess" value={guess} onChange={e => this.setState({ guess: e.target.value })} />
          </div>
          <PrimaryButton onClick={this.submitGameStep}>Submit</PrimaryButton>
        </>
      );
    }

    if (gameStep.type === 'DRAWING') {
      return (
        <DrawingPage
          onSubmitDrawing={this.submitGameStep}
          word={previousGameStep ? previousGameStep.guess : gameChain.originalWord}
          timeRemaining={timeRemaining}
        />
      );
    }
    return <div />;
  }
}

GameStep.propTypes = {
  classes: PropTypes.object,
  gameStep: PropTypes.object,
  previousGameStep: PropTypes.object,
  dispatch: PropTypes.func,
  gameChain: PropTypes.object,
  guessTimeLimit: PropTypes.number,
  drawTimeLimit: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    drawTimeLimit: state.game.game.drawTimeLimit,
    guessTimeLimit: state.game.game.guessTimeLimit,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(GameStep));
