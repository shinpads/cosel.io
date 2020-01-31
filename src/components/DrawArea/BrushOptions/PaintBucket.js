import React, { Component } from 'react';

export class PaintBucket extends Component {
    state = {
      outline: '',
    }

    render() {
      return (
        <div>
          <img alt="paint bucket" onClick={(e) => { this.props.selectDraw('bucket'); }} style={{ outline: this.state.outline }} />
        </div>
      );
    }
}
export default PaintBucket;
