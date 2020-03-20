import React, { Component } from 'react';
import colors from '../../colors';

const canvasStyle = {
  borderLeft: '1px dashed',
  borderRight: '1px dashed',
  backgroundColor: colors.canvas,
};

export class Draw extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }


  componentDidMount() {
    const height = Math.min(document.getElementById('drawArea').parentElement.offsetHeight, document.getElementById('drawArea').parentElement.offsetWidth);
    const width = height;

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

    const startStroke = (event) => {
      let e;
      if (event.touches) {
        event.preventDefault();
        e = event.touches[0];
      } else {
        e = event;
      }
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - Math.round(rect.left);
      mouse.y = e.clientY - Math.round(rect.top);
      const numStrokes = window.drawData.strokes.length;

      window.drawData.strokes[numStrokes - 1] = {
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
      finishLine();
    };

    const movePosition = (event) => {
      let e;
      if (event.touches) {
        event.preventDefault();
        e = event.touches[0];
      } else {
        e = event;
      }
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - Math.round(rect.left);
      mouse.y = e.clientY - Math.round(rect.top);

      if (mouseStatus === 'down') {
        const numStrokes = window.drawData.strokes.length;
        if (window.drawData.strokes[numStrokes - 1].points.length >= 2) {
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
      }
    };

    document.addEventListener('mouseup', endStroke);
    canvas.addEventListener('touchend', endStroke);

    document.addEventListener('mousemove', movePosition, false);
    canvas.addEventListener('touchmove', movePosition, { passive: false });

    canvas.addEventListener('mousedown', startStroke, false);
    canvas.addEventListener('touchstart', startStroke, { passive: false });

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
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        id="drawArea"
      >
        <canvas id="canvas" ref={this.canvasRef} style={canvasStyle} />
      </div>
    );
  }
}
export default Draw;
