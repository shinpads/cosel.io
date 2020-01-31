import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export class Color extends Component {
  constructor(props) {
    super(props);
    this.state = {
      border: '',
      selected: false,
    };
    this.canvasRef = React.createRef();
  }


  componentDidMount() {
    const { selected } = this.state;
    const canvas = this.canvasRef.current;
    const { color, selectColor } = this.props;
    const ctx = canvas.getContext('2d');

    canvas.width = 20;
    canvas.height = 20;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 20, 20);

    canvas.addEventListener('mousedown', () => {
      selectColor(color);
    }, false);
    canvas.addEventListener('mouseover', () => {
      if (!selected) {
        this.glow('onHover');
      }
    }, false);
    canvas.addEventListener('mouseout', () => {
      if (!selected) {
        this.glow('unGlow');
      }
    }, false);
  }

  glow = (c) => {
    const { color } = this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (c === 'onHover') {
      ctx.strokeStyle = '#DEF2F1';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.rect(0, 0, 20, 20);
      ctx.stroke();
    } else if (c === 'onClick') {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.fillRect(0, 0, 20, 20);
      ctx.rect(1, 1, 18, 18);
      ctx.stroke();
    } else if (c === 'unGlow') {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.fillRect(0, 0, 20, 20);
      ctx.stroke();
    }
  }

  render() {
    const { border } = this.state;
    return (
      <div>
        <canvas ref={this.canvasRef} style={{ border }} />
      </div>
    );
  }
}

Color.propTypes = {
  color: PropTypes.string.isRequired,
  selectColor: PropTypes.func.isRequired,

};

export default Color;
