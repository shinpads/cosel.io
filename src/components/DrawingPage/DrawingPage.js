import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import GameArea from '../DrawArea/GameArea';


const styles = {
  root: {

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
    } = this.props;
    return (
      <div className={classes.root}>
        <div>{`Draw "${word}"`}</div>
        <div>Time {timeRemaining}</div>
        <GameArea />
        <Button onClick={onSubmitDrawing}>Submit</Button>
      </div>
    );
  }
}

DrawingPage.propTypes = {
  onSubmitDrawing: PropTypes.func.isRequired,
  word: PropTypes.string.isRequired,
  classes: PropTypes.object,
  timeRemaining: PropTypes.number,
};

export default withStyles(styles)(DrawingPage);
