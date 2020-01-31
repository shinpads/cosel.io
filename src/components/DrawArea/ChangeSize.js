import React, { Component } from 'react';
import { Select, MenuItem } from '@material-ui/core';

export class ChangeSize extends Component {
  componentDidMount() {
    this.props.changeSize(sizes[0]);
  }

    createMenuItem = n => <MenuItem value={n}>Size {n}</MenuItem>

    render() {
      return (
        <div>
          <Select style={{ height: '25px' }} variant="outlined" defaultValue={sizes[0]} onChange={(e) => this.props.changeSize(e.target.value)}>
            {sizes.map((n) => this.createMenuItem(n))}
          </Select>
        </div>
      );
    }
}
export default ChangeSize;

let sizes = [6, 8, 20];
