import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import Replay from '../Replay';
import GameStep from './GameStep';

const styles = {
  root: {

  },
  carouselItem: {
    backgroundColor: "#F5F5F5",
    height: "100%",
  }
};


class GameResultBook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  printPages = () => {
    const { gameChain, drawingMap, classes } = this.props;
    let pages = [];

    for (let i = 0; i < gameChain.gameSteps.length; i++){
      const curStep = gameChain.gameSteps[i];

      if (curStep.type === 'DRAWING'){
        let wordToDraw = '';
        const drawData = drawingMap[String(curStep.drawing)];

        if (i < 2){
          wordToDraw = gameChain.originalWord;
        } 
        else {
          wordToDraw = gameChain.gameSteps[i-1].guess;
        }

        if (i+1 < gameChain.gameSteps.length){
          pages.push(
            <div style={styles.carouselItem}>
              <div>{curStep.user.username}'s drawing for {wordToDraw}</div>
              <Replay width={300} drawData={drawData} />
              <div>{gameChain.gameSteps[i+1].user.username} guessed: {gameChain.gameSteps[i+1].guess}</div>
            </div>
          );
        }
        else {
          pages.push(
            <div style={styles.carouselItem}>
              <div>{curStep.user.username}'s drawing for {wordToDraw}</div>
              <Replay width={300} drawData={drawData} />
            </div>
          );
        }
      }
    }
    
    return pages;
  }

  render() { 

    const { gameChain, drawingMap, classes } = this.props;
    return (
      <div>
        <div style={styles.carouselItem}>
          Original word: {gameChain.originalWord}
        </div>
        <Carousel showThumbs={false} showStatus={false} >
          {this.printPages().map(page => page)}
        </Carousel>
        <hr />
      </div>
    );
  }
}

GameResultBook.propTypes = {
  gameChain: PropTypes.object,
  classes: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    drawingMap: state.game.drawingMap,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(GameResultBook));