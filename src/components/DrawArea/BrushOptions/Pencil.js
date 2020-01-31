import React, { Component } from 'react';

export class Pencil extends Component {
    state = {
      outline: '',
    }

    render() {
      return (
        <div>
          <img alt="pencil" onClick={(e) => { this.props.selectDraw('pencil'); }} style={{ outline: this.state.outline }} />
        </div>
      );
    }
}
export default Pencil;
