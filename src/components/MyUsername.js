import React, { Component } from 'react';
import { ClickAwayListener } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { PrimaryInput } from './Base/Input';
import { setUsername } from '../actions/userActions';

const styles = {
  root: {
    display: 'flex',
  },
  name: {
    transition: 'all 200ms ease',
    fontSize: '2rem',
    cursor: 'pointer',
    fontWeight: 600,
    opacity: 1,
    '&:hover': {
      opacity: 0.5,
    },
  },
};

class MyUsername extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      newName: props.username,
    };
  }

  submit = () => {
    const { newName } = this.state;
    const { dispatch } = this.props;
    if (!newName.length) return;
    dispatch(setUsername(newName));
    this.setState({ editMode: false });
  };

  render() {
    const {
      classes,
      username,
      textClass,
      style,
    } = this.props;
    const { editMode, newName } = this.state;
    if (editMode) {
      return (
        <ClickAwayListener onClickAway={this.submit}>
          <div style={style} className={classes.root}>
            <form onSubmit={e => { e.preventDefault(); this.submit(); }}>
              <PrimaryInput
                defaultValue={username}
                value={newName}
                onChange={e => this.setState({ newName: e.currentTarget.value })}
                autoFocus
                maxlength={16}
                autocomplete="off"
                spellcheck={false}
              />
            </form>
          </div>
        </ClickAwayListener>
      );
    }
    return (
      <div style={style} className={classes.root}>
        <div
          className={classNames(classes.name, textClass)}
          onClick={() => this.setState({ editMode: true, newName: username })}
        >
          {username}
        </div>
      </div>
    );
  }
}

MyUsername.propTypes = {
  classes: PropTypes.object,
  username: PropTypes.string,
  textClass: PropTypes.string,
  style: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect()(withStyles(styles)(MyUsername));
