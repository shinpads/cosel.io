import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from '@material-ui/core';
import GameArea from '../DrawArea/GameArea';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {

  },
};

class DrawingPage extends Component {
  render() {
    const { onSubmitDrawing, word, classes } = this.props;
    return (
      <div className={classes.root}>
        <div>{`Draw "${word}"`}</div>
        <GameArea />
        <Button onClick={onSubmitDrawing}>Submit</Button>
      </div>
    );
  }
}

DrawingPage.propTypes = {
  onSubmitDrawing: PropTypes.func.isRequired,
  word: PropTypes.string.isRequired,
};

export default withStyles(styles)(DrawingPage);
