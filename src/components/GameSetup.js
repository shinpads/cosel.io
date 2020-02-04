import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createGame, findGame } from '../actions/gameActions';
import { HowToPlay } from './HowToPlay/HowToPlay';

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

  createGame = () => {
    const { dispatch } = this.props;
    dispatch(createGame());
  }

  findGame = () => {
    const { dispatch } = this.props;
    dispatch(findGame());
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
              <Button onClick={this.createGame}>Create Room</Button>
              <Button onClick={this.findGame}>Find Room</Button>
            </div>
          </div>
        </form>
        <HowToPlay />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

GameSetup.propTypes = {
  classes: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(withStyles(styles)(GameSetup));
