import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setUsername } from '../../actions/userActions';
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
};


class SetUsername extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  submitUsername = () => {
    const { dispatch } = this.props;
    const { username } = this.state;
    dispatch(setUsername(username));
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
              onChange={e => this.setState({ username: e.currentTarget.value })}
            />
          </div>
        </form>
        <PrimaryButton onClick={this.submitUsername}>join game</PrimaryButton>
      </>
    );
  }
}

SetUsername.propTypes = {
  classes: PropTypes.object,
  dispatch: PropTypes.func,
};


export default connect()(withStyles(styles)(SetUsername));
