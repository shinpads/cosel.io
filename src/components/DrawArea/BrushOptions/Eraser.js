import React, { Component } from 'react';

export class Eraser extends Component {
    state = {
      outline: '',
    }

    render() {
      return (
        <div>
          <img onClick={(e) => { this.props.selectDraw('eraser'); }} style={{ outline: this.state.outline }} alt="eraser" />
        </div>
      );
    }
}
export default Eraser;
