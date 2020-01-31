import React, { Component } from 'react';
import { Draw } from './Draw.js';
import { BrushSelector } from './BrushOptions/BrushSelector.js';
import { ChangeSize } from './ChangeSize.js';

export class GameArea extends Component {
    selectDraw = (drawType, drawColor) => {
      const { drawBox } = this.refs;
      if (drawType === 'bucket') {
        drawBox.setState({ bucket: true });
      } else {
        drawBox.setState({ bucket: false });
      }
      drawBox.changeColor(drawColor);
    }

    changeColor = (color) => {
      const { drawBox } = this.refs;
      drawBox.changeColor(color);
    }

    changeSize = (size) => {
      const { drawBox } = this.refs;
      drawBox.changeSize(size);
    }

    render() {
      return (
        <div>
          <Draw ref="drawBox" />
          <div style={horizontal}>
            <BrushSelector selectDraw={this.selectDraw} changeColor={this.changeColor} />
            <div style={onRight}>
              <ChangeSize changeSize={this.changeSize} />
            </div>
          </div>
        </div>
      );
    }
}

let horizontal = {
  display: 'flex',
  flexDirection: 'row',
};

let onRight = {
  marginLeft: 'auto',
};

export default GameArea;
