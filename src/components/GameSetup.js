import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { createGame, findGame } from '../actions/gameActions';
import { HowToPlay } from './HowToPlay/HowToPlay';
import { Replay } from './Replay';
import GameArea from './DrawArea/GameArea';

const styles = {
  root: {
    textAlign: 'center',
    marginTop: '75px',
  },
  card: {
    width: '350px',
    paddingTop: '30px',
    paddingBottom: '30px',
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
    this.replayRef = React.createRef();
    this.state = {

    };
  }

  createNewGame = () => {
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
        <Grid container justify="center">
          <Card className={classes.card}>
            Game Setup
            <form>
              <Grid container justify="center">
                <div className={classes.form}>
                  <div className={classes.buttonsContainer}>
                    <Button onClick={this.createNewGame}>Create Room</Button>
                    <Button onClick={this.findGame}>Find Room</Button>
                  </div>
                </div>
              </Grid>
            </form>
          </Card>
        </Grid>
        <HowToPlay />
        <div>
          <GameArea />
          <Replay width={300} />
        </div>
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
