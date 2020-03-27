import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Done } from '@material-ui/icons';

import { DotDotDot } from '../Base/Loader';
import colors from '../../colors';

const styles = {
  title: {
    fontStyle: 'italic',
    fontSize: '1rem',
    textAlign: 'center',
    color: colors.backgroundContrast,
  },
  playerList: {
    flexGrow: 1,
    padding: '1rem',
    paddingBottom: '0rem',
    overflow: 'auto',
  },
  playerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  playerName: {
    fontSize: '2rem',
  },
  playerStatus: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

class WaitingForNextRound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, users, userSubmittedMap } = this.props;
    return (
      <>
        <div>
          <div className={classes.title}>Waiting for other players</div>
        </div>
        <div className={classes.playerList}>
          {users.map(user => <User username={user.username} done={userSubmittedMap[user._id]} classes={classes} />)}
        </div>
      </>
    );
  }
}

const User = ({
  username,
  done,
  classes,
}) => (
  <div className={classes.playerContainer}>
    <div className={classes.playerName}>{username}</div>
    <div className={classes.playerStatus}>
      {done
        ? <Done style={{ fontSize: '2rem' }} />
        : <DotDotDot /> }
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    users: state.game.game.users,
    userSubmittedMap: state.game.userSubmittedMap,
  };
}

WaitingForNextRound.propTypes = {
  users: PropTypes.array,
  classes: PropTypes.object,
  userSubmittedMap: PropTypes.object,
};

User.propTypes = {
  username: PropTypes.string,
  done: PropTypes.bool,
  classes: PropTypes.object,
};

export default connect(mapStateToProps)(withStyles(styles)(WaitingForNextRound));
