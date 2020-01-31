import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export class Pencil extends Component {
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
        <input type="image" alt="pencil" onClick={() => { selectDraw('pencil'); }} style={{ outline }} />
      </div>
    );
  }
}

Pencil.propTypes = {
  selectDraw: PropTypes.func.isRequired,
};

export default Pencil;
