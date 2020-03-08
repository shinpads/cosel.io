import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PrimaryButton } from './Base/Button';
// import Button from '@material-ui/core/Button';
import { createGame, findGame } from '../actions/gameActions';

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
    return (
      <form>
        <PrimaryButton variant="contained" onClick={this.createNewGame}>Primary</PrimaryButton>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

GameSetup.propTypes = {
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(withStyles(styles)(GameSetup));
