import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import ArrowForwardIcon from '@material-ui/icons/ChevronRight';
import ArrowBackIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import Replay from '../Replay';
import colors from '../../colors';

const styles = {
  root: {
    marginBottom: '2rem',
    maxWidth: '400px',
    margin: '0 auto',
  },
  carouselItem: {
    backgroundColor: colors.canvas,
    height: '100%',
  },
  originalWord: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '2rem',
  },
  guess: {
    fontWeight: 600,
    fontSize: '1.5rem',
  },
  indicator: {
    width: '8px',
    height: '8px',
    borderRadius: '8px',
    border: '1px solid #000',
    margin: '0rem 1px',
    transition: 'all 250ms ease',
  },
  indicators: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  arrow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    zIndex: 10,
    padding: '2px',
  },
};


class GameResultBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  printPages = () => {
    const { gameChain, drawingMap, classes } = this.props;
    const { index } = this.state;
    const pages = [];
    gameChain.gameSteps = gameChain.gameSteps.filter(gs => gs.submitted);
    for (let i = 0; i < gameChain.gameSteps.length; i++) {
      const curStep = gameChain.gameSteps[i];

      if (curStep.type === 'DRAWING') {
        let wordToDraw = '';
        const drawData = drawingMap[String(curStep.drawing)];

        if (i < 2) {
          wordToDraw = gameChain.originalWord;
        } else {
          wordToDraw = gameChain.gameSteps[i - 1].guess;
        }

        if (i + 1 < gameChain.gameSteps.length) {
          pages.push(
            <div style={styles.carouselItem}>
              <div>{curStep.user.username}{` drew ${wordToDraw}`}</div>
              {index === Math.ceil(i / 2) && <Replay width={300} animate drawData={drawData} key={curStep._id} />}
              {index !== Math.ceil(i / 2) && <div style={{ width: 300, height: 300 }} />}
              <div>
                {gameChain.gameSteps[i + 1].user.username} guessed
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                <div className={classes.guess}>
                  {gameChain.gameSteps[i + 1].guess}
                </div>
                <div style={{ fontSize: '1rem' }}>{' '}{gameChain.gameSteps[i + 1].guessAutoFilled ? '(Auto Filled)' : ''}</div>
              </div>
            </div>,
          );
        } else {
          pages.push(
            <div style={styles.carouselItem}>
              <div>{curStep.user.username}{` drew ${wordToDraw}`}</div>
              <Replay width={300} animate drawData={drawData} key={curStep._id} />
            </div>,
          );
        }
      }
    }
    return pages;
  }

  renderIndicators = (count) => {
    const { classes } = this.props;
    const { index } = this.state;
    const indicators = [];
    for (let i = 0; i < count; i++) {
      indicators.push(<div
        className={classes.indicator}
        style={i === index ? { backgroundColor: '#000' } : { backgroundColor: '#fff' }}
      />);
    }
    return (
      <div className={classes.indicators}>
        {indicators}
      </div>
    );
  }

  render() {
    const { gameChain, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.originalWord}>
          {gameChain.originalWord}
        </div>
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          renderArrowNext={(onClick, show) => (
            <div className={classes.arrow} style={{ right: 0, zIndex: show ? 10 : -10 }}>
              <IconButton disableRipple onClick={onClick} style={{ padding: '4px' }}>
                <ArrowForwardIcon style={{ color: '#000' }} />
              </IconButton>
            </div>
          )}
          renderArrowPrev={(onClick, show) => (
            <div className={classes.arrow} style={{ left: 0, zIndex: show ? 10 : -10 }}>
              <IconButton disableRipple onClick={onClick} style={{ padding: '4px' }}>
                <ArrowBackIcon style={{ color: '#000' }} />
              </IconButton>
            </div>
          )}
          onChange={(i) => this.setState({ index: i })}
        >
          {this.printPages()}
        </Carousel>
        {this.renderIndicators(Math.ceil(gameChain.gameSteps.length / 2))}
      </div>
    );
  }
}

GameResultBook.propTypes = {
  gameChain: PropTypes.object,
  drawingMap: PropTypes.object,
  classes: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    drawingMap: state.game.drawingMap,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(GameResultBook));
