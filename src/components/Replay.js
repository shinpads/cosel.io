import React, { Component } from 'react';

export class Replay extends Component {
  componentDidMount() {
    this.canvasRef = React.createRef();
  }

  drawFromPointsList = (pointsList) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < pointsList.length; i++) {
      const curPoints = pointsList[i];
      ctx.strokeStyle = curPoints.color;
      ctx.lineWidth = curPoints.size;
      ctx.beginPath();
      if (curPoints.points.length > 0) {
        ctx.moveTo(curPoints.points[0].x, curPoints.points[0].y);
      }
      for (let j = 0; j < curPoints.points.length; j++) {
        const curPoint = curPoints.points[j];
        setTimeout(() => {
          ctx.lineTo(curPoint.x, curPoint.y);
          ctx.stroke();
          ctx.moveTo(curPoint.x, curPoint.y);
        }, 1 * j);
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

export default Replay;
