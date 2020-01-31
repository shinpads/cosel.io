import React, { Component } from 'react';

export class Draw extends Component {
  state = {
    bucket: false,
    currentColor: '',
  }

  componentDidMount() {
    const width = Math.floor(window.innerWidth / 3);
    const height = width;

    const canvas = this.refs.mainCanvas;
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

    document.addEventListener('mouseup', (e) => {
      if (!this.state.bucket) {
        mouseStatus = 'up';
        finishLine();
      }
    });

    document.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - Math.round(rect.left);
      mouse.y = e.clientY - Math.round(rect.top);

      if (mouseStatus === 'down' && !this.state.bucket) {
        draw();
      }
    }, false);

    canvas.addEventListener('mousedown', (e) => {
      if (!this.state.bucket) {
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
      const canvas = this.refs.mainCanvas;
      const ctx = canvas.getContext('2d');
      const fillX = mouse.x;
      const fillY = mouse.y;
      const imgData = ctx.getImageData(0, 0, width, height);
      const pixels = [[fillX, fillY]];
      const mem = [[fillX, fillY]];

      const firstFillColor = getColorFromImgData(fillX, fillY, imgData);

      while (pixels.length > 0) {
        const [curX, curY] = pixels.shift();
        const left = [curX - 1, curY];
        const right = [curX + 1, curY];
        const up = [curX, curY - 1];
        const down = [curX, curY + 1];
        if (left[0] > 0) {
          if (colorMatch(firstFillColor, getColorFromImgData(left[0], left[1], imgData))) {
            if (!arrayWithinArray(mem, left)) {
              imgData.data.set(drawPixel(this.state.currentColor, left[0], left[1], imgData));
              pixels.push(left);
              mem.push(left);
            }
          }
        }
        if (right[0] < width) {
          if (colorMatch(firstFillColor, getColorFromImgData(right[0], right[1], imgData))) {
            if (!arrayWithinArray(mem, right)) {
              imgData.data.set(drawPixel(this.state.currentColor, right[0], right[1], imgData));
              pixels.push(right);
              mem.push(right);
            }
          }
        }
        /*
        if(up[1] > 0){
          console.log(up[1]);
          if(colorMatch(firstFillColor, getColorFromImgData(up[0], up[1], imgData))){
            if (!arrayWithinArray(mem, up)){
              imgData.data.set(drawPixel(this.state.currentColor, up[0], up[1], imgData));
              pixels.push(up);
              mem.push(up);
            }
          }
        } */

        if (down[1] < height) {
          if (colorMatch(firstFillColor, getColorFromImgData(down[0], down[1], imgData))) {
            if (!arrayWithinArray(mem, down)) {
              imgData.data.set(drawPixel(this.state.currentColor, down[0], down[1], imgData));
              pixels.push(down);
              mem.push(down);
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
    };

    const arrayWithinArray = (larger, smaller) => {
      let good = false;
      for (const i in larger) {
        if (larger[i].length === smaller.length) {
          for (const j in larger[i]) {
            good = true;

            if (larger[i][j] !== smaller[j]) {
              good = false;
              break;
            }
          }
          if (good === true) {
            return true;
          }
        }
      }
      return false;
    };

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
    };

    const finishLine = () => {
      allPoints.push({ points, color: ctx.strokeStyle, size: ctx.lineWidth });
      points = [];
    };
  }

  changeColor = (color) => {
    const canvas = this.refs.mainCanvas;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    this.setState({ currentColor: ctx.strokeStyle });
  }

  changeSize = (size) => {
    const canvas = this.refs.mainCanvas;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = size;
  }

  render() {
    return (
      <div id="drawArea">
        <canvas id="canvas" ref="mainCanvas" style={{ border: '3px solid white' }} />
      </div>
    );
  }
}
export default Draw;
