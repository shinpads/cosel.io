import React, { Component } from 'react';

export class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bucket: false,
      currentColor: '',
    };
    this.canvasRef = React.createRef();
  }


  componentDidMount() {
    const { bucket } = this.state;
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
      if (!bucket) {
        mouseStatus = 'up';
        finishLine();
      }
    });

    document.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - Math.round(rect.left);
      mouse.y = e.clientY - Math.round(rect.top);

      if (mouseStatus === 'down' && !bucket) {
        draw();
      }
    }, false);

    canvas.addEventListener('mousedown', () => {
      if (!bucket) {
        draw();
        mouseStatus = 'down';
      } else {
        fill();
      }
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

    const fill = () => {
      const { currentColor } = this.state;
      console.log(currentColor);
    };
    /*

    const findOffsetInImageData = (x, y) => (((y - 1) * width) * 4) + ((x - 1) * 4);

    const getColorFromImgData = (x, y, imgData) => {
      const offset = findOffsetInImageData(x, y);
      const r = imgData.data[offset];
      const g = imgData.data[offset + 1];
      const b = imgData.data[offset + 2];
      return [r, g, b];
    };

    const hexToRGB = (hex) => {
      const arr = hex.split('');
      const r = parseInt(arr[1] + arr[2], 16);
      const g = parseInt(arr[3] + arr[4], 16);
      const b = parseInt(arr[5] + arr[6], 16);
      return [r, g, b];
    };

    const drawPixel = (color, x, y, imgData) => {
      const { data } = imgData;
      const offset = findOffsetInImageData(x, y);
      const rgbColor = hexToRGB(color);
      data[offset] = rgbColor[0];
      data[offset + 1] = rgbColor[1];
      data[offset + 2] = rgbColor[2];

      return data;
    };

    const colorMatch = (firstColor, secondColor) => {
      if (JSON.stringify(firstColor) === JSON.stringify(secondColor)) {
        return true;
      }

      return false;
    }; */

    const finishLine = () => {
      allPoints.push({ points, color: ctx.strokeStyle, size: ctx.lineWidth });
      points = [];
    };
  }

  changeColor = (color) => {
    const { canvas } = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    this.setState({ currentColor: ctx.strokeStyle });
  }

  changeSize = (size) => {
    const { canvas } = this.canvasRef.current;
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
