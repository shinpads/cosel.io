import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { submitStep } from '../../actions/gameActions';
import Replay from '../Replay';
import { getDrawing } from '../../api';
import { SecondaryButton } from '../Base/Button';
import { PrimaryInput } from '../Base/Input';
import WaitingForNextRound from './WaitingForNextRound';
import GameArea from '../DrawArea/GameArea';

const styles = {
  replayContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    borderBottom: '1px solid black',
  },
  info: {
    display: 'grid',
    padding: '0.5rem',
    width: 'calc(100% - 1rem)',
    gridTemplateColumns: '1fr 3fr 1fr',
    borderBottom: '1px solid',
  },
  time: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 2000ms ease',
    fontSize: '1.5rem',
    transform: 'scale(1)',
    color: '#000',
  },
  timeLow: {
    transform: 'scale(2)',
    color: 'red',
  },
  buttonContainer: {
    margin: 'auto',
    marginRight: '4px',
  },
  title: {
    fontWeight: 600,
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    '@media (max-width: 960px)': {
      fontSize: '1.5rem',
    },
  },
  titleSmall: {
    '@media (max-width: 960px)': {
      fontSize: '1rem',
    },
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
    if (gameStep.submitted) {
      this.setState({ submitted: true });
      return;
    }
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
    this.setState({ submitted: true });
    dispatch(submitStep(gameStep));
  }

  onSubmitDrawing = () => {
    const { dispatch, gameStep } = this.props;
    gameStep.drawData = window.drawData;
    this.setState({ submitted: true });
    dispatch(submitStep(gameStep));
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
      return <WaitingForNextRound />;
    }
    if (gameStep.type === 'GUESS') {
      return (
        <>
          <div className={classes.info}>
            <div className={classNames(classes.time, timeRemaining < 10 ? classes.timeLow : '')}>{timeRemaining}s</div>
            <div className={classNames(classes.title, previousGameStep.user.username.length > 10 ? classes.titleSmall : '')}>
              {previousGameStep.user.username} drew
            </div>
            <div className={classes.buttonContainer}>
              <SecondaryButton onClick={this.submitGameStep} title="submit" />
            </div>
          </div>
          {loadingDrawData && <div>Loading... (If it does not load, try refreshing the page)</div>}
          {!loadingDrawData && (
            <div className={classes.replayContainer}>
              <Replay animate drawData={drawData} />
            </div>
          )}
          <form style={{ display: 'contents' }} onSubmit={e => { e.preventDefault(); this.submitGameStep(); }}>
            <div style={{ margin: '2rem' }}>
              <PrimaryInput maxlength={25} placeholder="Guess" value={guess} onChange={e => this.setState({ guess: e.target.value })} />
            </div>
          </form>
        </>
      );
    }

    if (gameStep.type === 'DRAWING') {
      const word = previousGameStep ? previousGameStep.guess : gameChain.originalWord;
      return (
        <>
          <div className={classes.info}>
            {/* <div className={classes.round}>{round}/{rounds}</div> */}
            <div className={classNames(classes.time, timeRemaining < 10 ? classes.timeLow : '')}>{timeRemaining}s</div>
            <div className={classNames(classes.title, word.length > 10 ? classes.titleSmall : '')}>
              {word}
            </div>
            <div className={classes.buttonContainer}>
              <SecondaryButton onClick={this.submitGameStep} title="submit" />
            </div>
          </div>
          <GameArea style={{ flexGrow: 1 }} />
        </>
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
