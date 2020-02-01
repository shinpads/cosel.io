import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export class PaintBucket extends Component {
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
        <input type="image" alt="paint bucket" onClick={() => { selectDraw('bucket'); }} style={{ outline }} />
      </div>
    );
  }
}

PaintBucket.propTypes = {
  selectDraw: PropTypes.func.isRequired,
};

export default PaintBucket;
