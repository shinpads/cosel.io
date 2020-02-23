import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import GameArea from '../DrawArea/GameArea';
import { Button } from '@material-ui/core';

export class DrawingPage extends Component {
    render() {
      const { onSubmitDrawing, word } = this.props;
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

export default DrawingPage;
