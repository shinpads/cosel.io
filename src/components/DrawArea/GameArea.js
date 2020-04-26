import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Draw } from './Draw';
import BrushSelector from './BrushOptions/BrushSelector';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
};

class GameArea extends Component {
  constructor(props) {
    super(props);
    this.drawBoxRef = React.createRef();
    this.state = {
      size: 1,
      color: '#000',
    };
  }

  changeColor = (color) => {
    const drawBox = this.drawBoxRef.current;
    drawBox.changeColor(color);
    this.setState({ color });
  }

  changeSize = (size) => {
    const drawBox = this.drawBoxRef.current;
    drawBox.changeSize(size);
    this.setState({ size });
  }

  render() {
    const { style, classes } = this.props;
    const { size, color } = this.state;

    return (
      <div className={classes.root} style={style || {}}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          id="drawArea"
        >
          <div>
            <Draw ref={this.drawBoxRef} />
            <BrushSelector
              changeColor={this.changeColor}
              changeSize={this.changeSize}
              color={color}
              size={size}
            />
          </div>
        </div>
      </div>
    );
  }
}

GameArea.propTypes = {
  style: PropTypes.object,
  classes: PropTypes.object,
};

export default withStyles(styles)(GameArea);
