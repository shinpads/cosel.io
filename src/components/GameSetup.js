import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
  root: {

  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
  },
  buttonsContainer: {
    display: 'flex',
  },
};

class GameSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        Game Setup
        <form>
          <div className={classes.form}>
            <TextField label="Name" />
            <div className={classes.buttonsContainer}>
              <Button>Create Room</Button>
              <Button>Find Room</Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

GameSetup.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(GameSetup);
