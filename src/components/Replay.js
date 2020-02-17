import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export class Replay extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const { width } = this.props;
    const canvas = this.canvasRef.current;

    canvas.width = width;
    canvas.height = width;
  }

  drawFromPointsList = async (pointsObj) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width } = this.props;
    const oldCanvasWidth = pointsObj.width;
    for (let i = 0; i < pointsObj.strokes.length; i++) {
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
        await new Promise(resolve => setTimeout(resolve, 0.01));
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
    return (
      <div>
        <canvas ref={this.canvasRef} />
      </div>
    );
  }
}

Replay.propTypes = {
  width: PropTypes.number,
};

export default Replay;
