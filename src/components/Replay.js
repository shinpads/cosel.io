import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import colors from '../colors';

const ANIMATE_TIME = 0;

class Replay extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const { drawData, width, fullWidth } = this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (width) {
      canvas.width = width;
      canvas.height = width;
    } else if (fullWidth) {
      canvas.height = document.getElementById('replayArea').parentElement.offsetWidth;
      canvas.width = canvas.height;
    } else {
      canvas.height = Math.min(document.getElementById('replayArea').parentElement.offsetHeight, document.getElementById('replayArea').parentElement.offsetWidth);
      canvas.width = canvas.height;
    }

    ctx.lineCap = 'round';
    this.drawFromPointsList(drawData);
  }

  drawFromPointsList = async (pointsObj) => {
    const { animate } = this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width } = canvas;
    const oldCanvasWidth = pointsObj.width;

    ctx.clearRect(0, 0, width, width);

    for (let i = 0; i < pointsObj.strokes.length; i++) {
      const timePerStroke = ANIMATE_TIME / pointsObj.strokes.length;
      const curStroke = pointsObj.strokes[i];
      ctx.strokeStyle = curStroke.color;
      ctx.lineWidth = curStroke.size;
      ctx.beginPath();
      if (curStroke.points.length > 0) {
        const newX = (curStroke.points[0].x / oldCanvasWidth) * width;
        const newY = (curStroke.points[0].y / oldCanvasWidth) * width;
        ctx.moveTo(newX, newY);
      }
      for (let j = 0; j < curStroke.points.length; j++) {
        if (animate) {
          await new Promise(resolve => setTimeout(resolve, timePerStroke / curStroke.points.length));
        }
        const curPoint = curStroke.points[j];
        const newX = (curPoint.x / oldCanvasWidth) * width;
        const newY = (curPoint.y / oldCanvasWidth) * width;
        ctx.lineTo(newX, newY);
        ctx.stroke();
        ctx.moveTo(newX, newY);
      }
      ctx.closePath();
    }
  }

  render() {
    const { className, canvasClassName } = this.props;
    return (
      <div
        id="replayArea"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.canvas,
        }}
        className={className || ''}
      >
        <canvas ref={this.canvasRef} className={canvasClassName || ''} />
      </div>
    );
  }
}

Replay.propTypes = {
  width: PropTypes.number,
  fullWidth: PropTypes.bool,
  drawData: PropTypes.object,
  className: PropTypes.string,
  canvasClassName: PropTypes.string,
  animate: PropTypes.bool,
};

export default Replay;
