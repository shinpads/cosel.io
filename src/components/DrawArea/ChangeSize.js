import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';

export class ChangeSize extends Component {
  componentDidMount() {
    const { changeSize } = this.props;
    changeSize(sizes[0]);
  }

    createMenuItem = n => <MenuItem value={n}>Size {n}</MenuItem>

    render() {
      const { changeSize } = this.props;
      return (
        <div>
          <Select style={{ height: '25px' }} variant="outlined" defaultValue={sizes[0]} onChange={(e) => changeSize(e.target.value)}>
            {sizes.map((n) => this.createMenuItem(n))}
          </Select>
        </div>
      );
    }
}

ChangeSize.propTypes = {
  changeSize: PropTypes.func.isRequired,
};

export default ChangeSize;

let sizes = [6, 8, 20];
