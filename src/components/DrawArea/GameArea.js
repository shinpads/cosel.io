import React, { Component } from 'react';
import { Draw } from './Draw';
import { BrushSelector } from './BrushOptions/BrushSelector';
import { ChangeSize } from './ChangeSize';

export class GameArea extends Component {
  constructor(props) {
    super(props);
    this.drawBoxRef = React.createRef();
  }

  selectDraw = (drawType, drawColor) => {
    const drawBox = this.drawBoxRef.current;
    if (drawType === 'bucket') {
      drawBox.setState({ bucket: true });
    } else {
      drawBox.setState({ bucket: false });
    }
    drawBox.changeColor(drawColor);
  }

  changeColor = (color) => {
    const drawBox = this.drawBoxRef.current;
    drawBox.changeColor(color);
  }

  changeSize = (size) => {
    const drawBox = this.drawBoxRef.current;
    drawBox.changeSize(size);
  }

  render() {
    return (
      <div>
        <Draw ref={this.drawBoxRef} />
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
