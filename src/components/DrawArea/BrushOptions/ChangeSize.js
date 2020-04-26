import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Select, MenuItem } from '@material-ui/core';

const sizes = [2, 6, 10, 25];

const styles = {
  size: {
    backgroundColor: '#000',
    borderRadius: '100%',
    margin: 'auto',
  },
  renderValueContainer: {
    width: '100%',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

class ChangeSize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    const { changeSize } = this.props;
    changeSize(sizes[0]);
  }

  changeSize = (size) => {
    const { changeSize } = this.props;
    changeSize(size);
    this.setState({ open: false });
  }

  render() {
    const { size, classes } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Select
          value={size}
          open={open}
          onOpen={() => this.setState({ open: true })}
          onClose={() => this.setState({ open: false })}
          variant="outlined"
          renderValue={(v) => (
            <div className={classes.renderValueContainer}>
              <div className={classes.size} style={{ width: `${v}px`, height: `${v}px` }} />
            </div>
          )}
        >
          {sizes.map((n) => <SizeItem size={n} className={classes.size} changeSize={this.changeSize} />)}
        </Select>
      </div>
    );
  }
}

const SizeItem = ({
  size,
  className,
  changeSize,
}) => (
  <MenuItem value={size} onClick={() => changeSize(size)}>
    <div className={className} style={{ width: `${size}px`, height: `${size}px` }} />
  </MenuItem>
);

SizeItem.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  changeSize: PropTypes.func,
};

ChangeSize.propTypes = {
  changeSize: PropTypes.func.isRequired,
  size: PropTypes.number,
  classes: PropTypes.object,
};

export default withStyles(styles)(ChangeSize);
