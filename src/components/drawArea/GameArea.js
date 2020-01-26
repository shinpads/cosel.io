import React, {Component} from 'react';
import {Draw} from './Draw.js';
import {ColorSelector} from './ColorSelector.js';
import {ChangeSize} from './ChangeSize.js';

export class GameArea extends Component {
    eraser = () => {
      let drawBox = this.refs.drawBox;
      drawBox.changeColor("#DEF2F1");
    }

    changeColor = (color) => {
      let drawBox = this.refs.drawBox;
      drawBox.changeColor(color);
    }

    newSize = (size) => {
      let drawBox = this.refs.drawBox;
      drawBox.changeSize(size);
    }

    render(){
      return (
        <div>
            <Draw ref="drawBox"/>
            <div style={horizontal}>
              <ColorSelector eraser={this.eraser} changeColor={this.changeColor}/>
              <div style={onRight}>
                <ChangeSize newSize={this.newSize}/>
              </div>
            </div>
        </div>
      );
    }
  
}

let horizontal = {
  display: 'flex',
  flexDirection: 'row'
}

let onRight = {
  marginLeft: 'auto'
}

export default GameArea;
