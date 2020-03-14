import React, { Component } from 'react';

export class Draw extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }


  componentDidMount() {
    const width = Math.floor(window.innerWidth);
    const height = width;

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    const mouse = { x: 0, y: 0 };
    window.drawData = {
      width,
      strokes: [{
        points: [],
        size: '',
        color: '',
      }],
    };
    let mouseStatus = 'up';

    canvas.width = width;
    canvas.height = height;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

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
      const numStrokes = window.drawData.strokes.length;
      if (window.drawData.strokes[numStrokes - 1].points.length === 0) {
        window.drawData.strokes[numStrokes - 1] = {
          points: [{ x: mouse.x, y: mouse.y }],
          size: ctx.lineWidth,
          color: ctx.strokeStyle,
        };
        const curPoint = window.drawData.strokes[numStrokes - 1].points[0];

        ctx.beginPath();
        ctx.moveTo(curPoint.x, curPoint.y);
        ctx.lineTo(curPoint.x, curPoint.y);
        ctx.stroke();
        ctx.closePath();
      } else {
        window.drawData.strokes[numStrokes - 1].points.push({ x: mouse.x, y: mouse.y });
        const curStroke = window.drawData.strokes[numStrokes - 1];
        const pointsLen = curStroke.points.length;
        const lastPoint = curStroke.points[pointsLen - 2];
        const curPoint = curStroke.points[pointsLen - 1];

        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(curPoint.x, curPoint.y);
        ctx.stroke();
        ctx.closePath();
      }
    };
    const finishLine = () => {
      const numStrokes = window.drawData.strokes.length;
      if (window.drawData.strokes[numStrokes - 1].points.length > 0) {
        window.drawData.strokes.push({
          points: [],
          size: '',
          color: '',
        });
      }
    };
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
        <canvas id="canvas" ref={this.canvasRef} />
      </div>
    );
  }
}
export default Draw;
