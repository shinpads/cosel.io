import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfilePictureDraw extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.drawData = {};
  }

  async componentDidMount() {
    const { width, size, color } = this.props;
    const canvas = this.canvasRef.current;
    console.log(this.props);
    canvas.width = width;
    canvas.height = width;

    this.drawData = {
      width,
      strokes: [{
        points: [],
        size: '',
        color: '',
      }],
    };

    const ctx = canvas.getContext('2d');
    const mouse = { x: 0, y: 0 };
    let mouseStatus = 'up';

    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    const startStroke = (event) => {
      let e;
      if (event.touches) {
        event.preventDefault();
        // eslint-disable-next-line prefer-destructuring
        e = event.touches[0];
      } else {
        e = event;
      }
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - Math.round(rect.left);
      mouse.y = e.clientY - Math.round(rect.top);
      const numStrokes = this.drawData.strokes.length;

      this.drawData.strokes[numStrokes - 1] = {
        points: [{ x: mouse.x, y: mouse.y }, { x: mouse.x, y: mouse.y }],
        size: ctx.lineWidth,
        color: ctx.strokeStyle,
      };

      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
      ctx.closePath();

      mouseStatus = 'down';
    };
    const endStroke = () => {
      mouseStatus = 'up';
      const numStrokes = this.drawData.strokes.length;
      if (this.drawData.strokes[numStrokes - 1].points.length > 0) {
        this.drawData.strokes.push({
          points: [],
          size: '',
          color: '',
        });
      }
    };
    const movePosition = (event) => {
      let e;
      if (event.touches) {
        event.preventDefault();
        // eslint-disable-next-line prefer-destructuring
        e = event.touches[0];
      } else {
        e = event;
      }
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - Math.round(rect.left);
      mouse.y = e.clientY - Math.round(rect.top);

      if (mouseStatus === 'down') {
        const numStrokes = this.drawData.strokes.length;
        if (this.drawData.strokes[numStrokes - 1].points.length >= 2) {
          this.drawData.strokes[numStrokes - 1].points.push({ x: mouse.x, y: mouse.y });
          const curStroke = this.drawData.strokes[numStrokes - 1];
          const pointsLen = curStroke.points.length;
          const lastPoint = curStroke.points[pointsLen - 2];
          const curPoint = curStroke.points[pointsLen - 1];

          ctx.beginPath();
          ctx.moveTo(lastPoint.x, lastPoint.y);
          ctx.lineTo(curPoint.x, curPoint.y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    };

    document.addEventListener('mouseup', endStroke);
    canvas.addEventListener('touchend', endStroke);

    document.addEventListener('mousemove', movePosition, false);
    canvas.addEventListener('touchmove', movePosition, { passive: false });

    canvas.addEventListener('mousedown', startStroke, false);
    canvas.addEventListener('touchstart', startStroke, { passive: false });
  }

  changeColor = (color) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
  }

  changeSize = (size) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = size;
  }

  getData = () => this.drawData;

  clear = () => {
    const { width } = this.props;
    this.drawData = {
      width,
      strokes: [{
        points: [],
        size: '',
        color: '',
      }],
    };
  }

  render() {
    const { canvasProps } = this.props;
    return (
      <canvas id="canvas" ref={this.canvasRef} {...canvasProps} />
    );
  }
}

ProfilePictureDraw.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  width: PropTypes.number,
  canvasProps: PropTypes.object,
};

export default ProfilePictureDraw;
