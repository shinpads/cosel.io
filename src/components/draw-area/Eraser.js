import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import untitled from './untitled.png';

export class Eraser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outline: '',
    };
  }

  render() {
    const { erase } = this.props;
    const { outline } = this.state;
    return (
      <div>
        <img onClick={erase} style={{ width: '24px', height: '24px', outline }} alt="eraser" />
      </div>
    );
  }
}

Eraser.propTypes = {
  erase: PropTypes.func,
};

export default Eraser;
