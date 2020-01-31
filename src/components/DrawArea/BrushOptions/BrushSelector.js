import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Color } from './Color';
import { Eraser } from './Eraser';
import { PaintBucket } from './PaintBucket';
import { Pencil } from './Pencil';

export class BrushSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
    };
    this.bucketRef = React.createRef();
    this.eraserRef = React.createRef();
    this.pencilRef = React.createRef();
    this.colorRefs = {};
    for (let i = 0; i < colors.length; i++) {
      this.colorRefs[colors[i]] = React.createRef();
    }
  }

  componentDidMount() {
    const curColor = this.colorRefs[colors[0]].current;
    const pencil = this.pencilRef.current;
    const { changeColor } = this.props;

    changeColor(colors[0]);
    this.setState({ color: colors[0] });
    curColor.glow('onClick');
    curColor.setState({ selected: true });

    pencil.setState({ outline: '2px solid black' });
  }

    selectDraw = (drawType) => {
      const bucket = this.bucketRef.current;
      const eraser = this.eraserRef.current;
      const pencil = this.pencilRef.current;
      const { selectDraw } = this.props;
      let { color } = this.state;

      if (drawType === 'eraser') {
        color = '#DEF2F1';
        eraser.setState({ outline: '2px solid black' });
        pencil.setState({ outline: '0px solid black' });
        bucket.setState({ outline: '0px solid black' });
      } else if (drawType === 'pencil') {
        eraser.setState({ outline: '0px solid black' });
        pencil.setState({ outline: '2px solid black' });
        bucket.setState({ outline: '0px solid black' });
      } else if (drawType === 'bucket') {
        eraser.setState({ outline: '0px solid black' });
        pencil.setState({ outline: '0px solid black' });
        bucket.setState({ outline: '2px solid black' });
      }

      selectDraw(drawType, color);
    }

    selectColor = (c) => {
      const { changeColor } = this.props;
      for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        const curColorComp = this.colorRefs[color].current;
        if (c === color) {
          curColorComp.glow('onClick');
          curColorComp.setState({ selected: true });
        } else {
          curColorComp.glow('unGlow');
          curColorComp.setState({ selected: false });
        }
      }
      this.setState({ color: c });
      changeColor(c);
    }

    createColor = c => <div><Color color={c} id={c} ref={this.colorRefs[c]} selectColor={this.selectColor} /></div>

    render() {
      return (
        <div style={horizontal}>
          <div style={flexBox}>
            {colors.map((c) => this.createColor(c))}
          </div>
          <Eraser ref={this.eraserRef} selectDraw={this.selectDraw} />
          <Pencil ref={this.pencilRef} selectDraw={this.selectDraw} />
          <PaintBucket ref={this.bucketRef} selectDraw={this.selectDraw} />
        </div>
      );
    }
}

BrushSelector.propTypes = {
  selectDraw: PropTypes.func.isRequired,
  changeColor: PropTypes.func.isRequired,
};

let horizontal = {
  display: 'flex',
  flexDirection: 'row',
};

let flexBox = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '10vmax',
};

let colors = ['purple', 'red', 'blue', 'green', 'yellow', 'pink', 'orange', 'violet'];

export default BrushSelector;
