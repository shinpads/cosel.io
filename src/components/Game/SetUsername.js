import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setUsername } from '../../actions/userActions';
import { joinGame } from '../../actions/gameActions';
import { PrimaryButton } from '../Base/Button';
import { PrimaryInput } from '../Base/Input';

const styles = {
  textField: {

  },
  root: {

  },
  formContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    padding: '0rem 2rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};


class SetUsername extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  async componentDidMount() {
    const { username, dispatch } = this.props;

    await dispatch(setUsername(username));
    await dispatch(joinGame());
  }

  submitUsername = async () => {
    const { dispatch } = this.props;
    const { username } = this.state;
    await dispatch(setUsername(username));
    await dispatch(joinGame());
  }

  render() {
    const { username } = this.state;
    const { classes } = this.props;
    return (
      <>
        <form style={{ display: 'contents' }} onSubmit={e => { e.preventDefault(); this.submitUsername(); }}>
          <div className={classes.formContainer}>
            <PrimaryInput
              label="username"
              spellcheck={false}
              autocomplete="off"
              value={username || ''}
              maxlength={16}
              onChange={e => this.setState({ username: e.currentTarget.value })}
            />
          </div>
        </form>
        <div className={classes.buttonContainer}>
          <PrimaryButton maxlength={15} onClick={this.submitUsername}>join game</PrimaryButton>
        </div>
      </>
    );
  }
}

SetUsername.propTypes = {
  classes: PropTypes.object,
  dispatch: PropTypes.func,
  username: PropTypes.string,
};


export default connect()(withStyles(styles)(SetUsername));
