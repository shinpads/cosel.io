import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Color } from './Color';
import { Eraser } from './Eraser';
import { Pencil } from './Pencil';
import colors from '../../../colors';

export class BrushSelector extends Component {
  constructor(props) {
    super(props);
    this.bucketRef = React.createRef();
    this.eraserRef = React.createRef();
    this.pencilRef = React.createRef();
    this.colorRefs = {};
    for (let i = 0; i < canvasColors.length; i++) {
      this.colorRefs[canvasColors[i]] = React.createRef();
    }
  }

  componentDidMount() {
    const curColor = this.colorRefs[canvasColors[0]].current;
    const pencil = this.pencilRef.current;
    const { changeColor } = this.props;

    changeColor(canvasColors[0]);
    curColor.glow('onClick');
    curColor.setState({ selected: true });

    pencil.setState({ outline: '2px solid black' });
  }

    selectDraw = (drawType) => {
      const eraser = this.eraserRef.current;
      const pencil = this.pencilRef.current;
      const { changeColor } = this.props;

      if (drawType === 'eraser') {
        const eraserColor = colors.canvas;
        eraser.setState({ outline: '2px solid black' });
        pencil.setState({ outline: '0px solid black' });
        changeColor(eraserColor);
      } else if (drawType === 'pencil') {
        eraser.setState({ outline: '0px solid black' });
        pencil.setState({ outline: '2px solid black' });
      }
    }

    selectColor = (c) => {
      const { changeColor } = this.props;
      for (let i = 0; i < canvasColors.length; i++) {
        const color = canvasColors[i];
        const curColorComp = this.colorRefs[color].current;
        if (c === color) {
          curColorComp.glow('onClick');
          curColorComp.setState({ selected: true });
        } else {
          curColorComp.glow('unGlow');
          curColorComp.setState({ selected: false });
        }
      }
      changeColor(c);
    }

    createColor = c => <div><Color color={c} id={c} ref={this.colorRefs[c]} selectColor={this.selectColor} /></div>

    render() {
      return (
        <div style={horizontal}>
          <div style={flexBox}>
            {canvasColors.map((c) => this.createColor(c))}
          </div>
          <Eraser ref={this.eraserRef} selectDraw={this.selectDraw} />
          <Pencil ref={this.pencilRef} selectDraw={this.selectDraw} />
        </div>
      );
    }
}

BrushSelector.propTypes = {
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

let canvasColors = ['#000'];

export default BrushSelector;
