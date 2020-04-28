import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ChangeSize from './ChangeSize';
import colors from '../../../colors';

export const BRUSH_SELECTOR_HEIGHT = 32;

const canvasColors = ['#000', colors.canvas, '#c72c2c', 'orange', '#dfe750', 'green', '#2e7dc6', '#5e462f'];

const styles = {
  root: {
    display: 'flex',
    height: `${BRUSH_SELECTOR_HEIGHT}px`,
  },
  colorsContainer: {
    display: 'flex',
    flexGrow: 1,
  },
  brushContainer: {
    display: 'flex',
    marginRight: '4px',
  },
  color: {
    width: '32px',
    height: '32px',
    borderRadius: '32px',
    cursor: 'pointer',
    margin: '0 4px',
    transition: 'all 250ms ease',
    userSelect: 'none',
    transform: 'scale(1)',
    boxShadow: '0px 0px 0px 0px transparent',
    '@media(max-width: 400px)': {
      width: '24px',
      height: '24px',
    },
  },
  selected: {
    transform: 'scale(1.1)',
    boxShadow: '1px 1px 4px 0px #4d4d4d',
  },
};

class BrushSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { changeColor } = this.props;
    changeColor(canvasColors[0]);
  }

  setColor = (index) => () => {
    const { changeColor } = this.props;
    changeColor(canvasColors[index]);
  }

  render() {
    const {
      classes,
      changeSize,
      color,
      size,
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.colorsContainer}>
          {canvasColors.map((c, i) => (
            <Color
              color={c}
              onClick={this.setColor(i)}
              className={classNames(classes.color, c === color ? classes.selected : '')}
            />
          ))}
        </div>
        <div className={classes.brushContainer}>
          <ChangeSize changeSize={changeSize} size={size} />
        </div>
      </div>
    );
  }
}

const Color = ({
  color,
  onClick,
  className,
}) => (
  <div
    className={className}
    onClick={onClick}
    style={{
      backgroundColor: color,
    }}
  />
);

BrushSelector.propTypes = {
  changeColor: PropTypes.func.isRequired,
  changeSize: PropTypes.func.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  classes: PropTypes.object,
};

Color.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.object,
};

export default withStyles(styles)(BrushSelector);
