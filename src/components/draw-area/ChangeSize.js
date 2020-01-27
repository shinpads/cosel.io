import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';

const sizes = [6, 8, 20];

export class ChangeSize extends Component {
  componentDidMount() {
    const { newSize } = this.props;
    newSize(sizes[0]);
  }

  createMenuItem = n => <MenuItem value={n}>Size {n}</MenuItem>

  render() {
    const { newSize } = this.props;
    return (
      <div>
        <Select style={{ height: '25px' }} variant="outlined" defaultValue={sizes[0]} onChange={(e) => newSize(e.target.value)}>
          {sizes.map(n => this.createMenuItem(n))}
        </Select>
      </div>
    );
  }
}

ChangeSize.propTypes = {
  newSize: PropTypes.func,
};

export default ChangeSize;
