import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export class Eraser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outline: '',
    };
  }

  render() {
    const { selectDraw } = this.props;
    const { outline } = this.state;
    return (
      <div>
        <input type="image" onClick={() => { selectDraw('eraser'); }} style={{ outline }} alt="eraser" />
      </div>
    );
  }
}
Eraser.propTypes = {
  selectDraw: PropTypes.func.isRequired,
};

export default Eraser;
