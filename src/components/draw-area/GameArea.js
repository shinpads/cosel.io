import React, { Component } from 'react';
import { Draw } from './Draw';
import { ColorSelector } from './ColorSelector';
import { ChangeSize } from './ChangeSize';

const horizontal = {
  display: 'flex',
  flexDirection: 'row',
};

const onRight = {
  marginLeft: 'auto',
};

export class GameArea extends Component {
    eraser = () => {
      const drawBox = this.refs.drawBox;
      drawBox.changeColor('#DEF2F1');
    }

    changeColor = (color) => {
      const drawBox = this.refs.drawBox;
      drawBox.changeColor(color);
    }

    newSize = (size) => {
      const drawBox = this.refs.drawBox;
      drawBox.changeSize(size);
    }

    render() {
      return (
        <div>
          <Draw ref="drawBox" />
          <div style={horizontal}>
            <ColorSelector eraser={this.eraser} changeColor={this.changeColor} />
            <div style={onRight}>
              <ChangeSize newSize={this.newSize} />
            </div>
          </div>
        </div>
      );
    }
}

export default GameArea;
