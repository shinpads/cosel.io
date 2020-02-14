import React, { Component } from 'react';

export class Draw extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }


  componentDidMount() {
    const width = Math.floor(window.innerWidth / 3);
    const height = width;

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    const mouse = { x: 0, y: 0 };
    let points = [];
    const allPoints = [];
    let mouseStatus = 'up';

    canvas.width = width;
    canvas.height = height;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'red';

    document.addEventListener('mouseup', () => {
      mouseStatus = 'up';
      finishLine();
    });

    document.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - Math.round(rect.left);
      mouse.y = e.clientY - Math.round(rect.top);

      if (mouseStatus === 'down') {
        draw();
      }
    }, false);

    canvas.addEventListener('mousedown', () => {
      draw();
      mouseStatus = 'down';
    }, false);

    const draw = () => {
      points.push({ x: mouse.x, y: mouse.y });
      if (points.length === 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[0].x, points[0].y);
        ctx.stroke();
        ctx.closePath();
      } else {
        const lastPoint = points[points.length - 2];
        const curPoint = points[points.length - 1];
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(curPoint.x, curPoint.y);
        ctx.stroke();
        ctx.closePath();
      }
    };
    const finishLine = () => {
      allPoints.push({ points, color: ctx.strokeStyle, size: ctx.lineWidth });
      console.log(JSON.stringify(allPoints).length);
      points = [];
    };
  }

  drawFromPointsList = (pointsList) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    for(let i = 0; i < pointsList.length; i++){
      curPoints = pointsList[i];
      ctx.strokeStyle = curPoints.color;
      ctx.lineWidth = curPoints.size;
      for(let j = 0; j < curPoints.points.length; j++){
        curPoint = curPoints.points[j];
      }
    }
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

  render() {
    return (
      <div id="drawArea">
        <canvas id="canvas" ref={this.canvasRef} style={{ border: '3px solid white' }} />
      </div>
    );
  }
}
export default Draw;
