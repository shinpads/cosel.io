import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draw } from './Draw';
// import { BrushSelector } from './BrushOptions/BrushSelector';
// import { ChangeSize } from './ChangeSize';

class GameArea extends Component {
  constructor(props) {
    super(props);
    this.drawBoxRef = React.createRef();
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
    const { style } = this.props;
    return (
      <div style={style || {}}>
        <Draw ref={this.drawBoxRef} />
        <div style={horizontal}>
          {/* <BrushSelector selectDraw={this.selectDraw} changeColor={this.changeColor} /> */}
          {/* <div style={onRight}>
            <ChangeSize changeSize={this.changeSize} />
          </div> */}
        </div>
      </div>
    );
  }
}

let horizontal = {
  display: 'flex',
  flexDirection: 'row',
};

GameArea.propTypes = {
  style: PropTypes.object,
};

export default GameArea;
