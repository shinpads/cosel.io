import React, { Component } from 'react';
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
  }

  componentDidMount() {
    const curColor = this.refs[colors[0]];
    const { pencil } = this.refs;
    const { changeColor } = this.props;

    changeColor(colors[0]);
    this.setState({ color: colors[0] });
    curColor.glow('onClick');
    curColor.setState({ selected: true });

    pencil.setState({ outline: '2px solid black' });
  }

    selectDraw = (drawType) => {
      const { bucket } = this.refs;
      const { eraser } = this.refs;
      const { pencil } = this.refs;
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

      this.props.selectDraw(drawType, color);
    }

    selectColor = (c) => {
      for (const color of colors) {
        const curColorComp = this.refs[color];
        if (c === color) {
          curColorComp.glow('onClick');
          curColorComp.setState({ selected: true });
        } else {
          curColorComp.glow('unGlow');
          curColorComp.setState({ selected: false });
        }
      }
      this.setState({ color: c });
      this.props.changeColor(c);
    }

    createColor = c => <div><Color color={c} id={c} ref={c} selectColor={this.selectColor} /></div>

    render() {
      return (
        <div style={horizontal}>
          <div style={flexBox}>
            {colors.map((c) => this.createColor(c))}
          </div>
          <Eraser ref="eraser" selectDraw={this.selectDraw} />
          <Pencil ref="pencil" selectDraw={this.selectDraw} />
          <PaintBucket ref="bucket" selectDraw={this.selectDraw} />
        </div>
      );
    }
}

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
