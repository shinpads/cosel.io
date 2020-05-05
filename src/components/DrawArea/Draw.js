import React, { Component } from 'react';
import colors from '../../colors';
import { BRUSH_SELECTOR_HEIGHT } from './BrushOptions/BrushSelector';

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

  async componentDidMount() {
    await new Promise(resolve => setTimeout(resolve, 250));
    this.setCanvasWidthAndHeight();
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    const mouse = { x: 0, y: 0 };

    let mouseStatus = 'up';


    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

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
        // eslint-disable-next-line prefer-destructuring
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

  setCanvasWidthAndHeight = () => {
    const height = Math.min(document.getElementById('drawArea').parentElement.offsetHeight - (BRUSH_SELECTOR_HEIGHT * 2),
      document.getElementById('drawArea').parentElement.offsetWidth);


    const width = height;

    const canvas = this.canvasRef.current;

    canvas.width = width;
    canvas.height = height;

    window.drawData = {
      width,
      strokes: [{
        points: [],
        size: '',
        color: '',
      }],
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
      <canvas id="canvas" ref={this.canvasRef} style={canvasStyle} />
    );
  }
}
export default Draw;
