import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Color } from './Color';
import { Eraser } from './Eraser';

const colors = ['purple', 'red', 'blue', 'green', 'yellow', 'pink', 'orange', 'violet'];

export class ColorSelector extends Component {
  componentDidMount() {
    const { changeColor } = this.props;
    changeColor(colors[0]);
    const curColorComp = this.refs[colors[0]];
    curColorComp.glow('onClick');
    curColorComp.setState({ selected: true });
  }

  erase = () => {
    const { eraser } = this.props;
    const eraseComp = this.refs.eraser;
    colors.forEach(color => {
      const curColorComp = this.refs[color];
      curColorComp.unGlow();
      curColorComp.setState({ selected: false });
    });
    eraseComp.setState({ outline: '2px solid black' });
    eraser();
  }

  changeBorder = (c) => {
    const { changeColor } = this.props;
    const eraseComp = this.refs.eraser;
    eraseComp.setState({ outline: '0px solid black' });
    colors.forEach(color => {
      const curColorComp = this.refs[color];

      if (c === color) {
        curColorComp.glow('onClick');
        curColorComp.setState({ selected: true });
      } else {
        curColorComp.unGlow();
        curColorComp.setState({ selected: false });
      }
    });

    changeColor(c);
  }

  render() {
    return (
      <div style={horizontal}>
        <div style={flexBox}>
          {colors.map(c => <div><Color color={c} id={c} ref={c} changeColor={this.changeBorder} /></div>)}
        </div>
        <Eraser ref="eraser" erase={this.erase} />
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

ColorSelector.propTypes = {
  changeColor: PropTypes.func,
  eraser: PropTypes.func,
};

export default ColorSelector;
