import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import colors from '../../colors';
import { PrimaryInput } from '../Base/Input';
import { PrimaryButton } from '../Base/Button';
import ProfilePictureDraw from '../ProfilePictureDraw';
// import BrushSelector from '../DrawArea/BrushOptions/BrushSelector';

const styles = {
  root: {

  },
  profileDrawerContainer: {
    // display: 'grid',
    // gridTemplateColumns: '1fr 0fr 1fr',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

class ProfileEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#000',
      size: 3,
    };
  }

  // changeSize = (size) => {
  //
  // }
  //
  // changeColor = (color) => {
  //
  // }

  render() {
    const { classes } = this.props;
    const { size, color } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.profileDrawerContainer}>
          {/* <BrushSelector
            changeSize={this.changeSize}
            changeColor={this.changeColor}
            color={color}
            size={size}
            vertical
            hideSizeChanger
          /> */}
          <ProfilePictureDraw
            width={256}
            size={size}
            color={color}
            canvasProps={{
              style: {
                border: '2px dashed #000',
                borderRadius: '256px',
                cursor: 'crosshair',
                backgroundColor: colors.canvas,
              },
            }}
          />
        </div>
        <div style={{ margin: '1rem 2rem' }}>
          <PrimaryInput placeholder="Username" style={{ textAlign: 'center' }} />
        </div>
        <PrimaryButton
          variant="contained"
          fullWidth
          onClick={this.createNewGame}
          style={{ width: '100%', margin: 0 }}
        >
          Save
        </PrimaryButton>
      </div>
    );
  }
}

ProfileEditor.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ProfileEditor);
