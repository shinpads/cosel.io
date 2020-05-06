import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Done } from '@material-ui/icons';
import classNames from 'classnames';

import { DotDotDot } from '../Base/Loader';
import colors from '../../colors';
import MyUsername from '../MyUsername';

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
  disconnected: {
    textDecoration: 'line-through',
  },
};

class WaitingForNextRound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      classes,
      connectedUsers,
      userSubmittedMap,
      players,
      user,
    } = this.props;
    return (
      <>
        <div>
          <div className={classes.title}>Waiting for other players</div>
        </div>
        <div className={classes.playerList}>
          {players.map(us => {
            const isMe = user._id === us._id;
            return (
              <User
                username={isMe ? user.username : us.username}
                done={userSubmittedMap[us._id]}
                classes={classes}
                connected={connectedUsers.findIndex(u => u._id === us._id) !== -1}
                isMe={isMe}
              />
            );
          })}
        </div>
      </>
    );
  }
}

const User = ({
  username,
  done,
  classes,
  connected,
  isMe,
}) => (
  <div className={classes.playerContainer}>
    {isMe
      ? <MyUsername username={username} textClass={classes.playerName} style={{ flexGrow: 1 }} />
      : <div className={classNames(classes.playerName, !connected ? classes.disconnected : '')}>{username}</div>}
    <div className={classes.playerStatus}>
      {done
        ? <Done style={{ fontSize: '2rem' }} />
        : <DotDotDot /> }
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    connectedUsers: state.game.game.users,
    players: state.game.game.players,
    userSubmittedMap: state.game.userSubmittedMap,
    user: state.user.user,
  };
}

WaitingForNextRound.propTypes = {
  connectedUsers: PropTypes.array,
  players: PropTypes.array,
  classes: PropTypes.object,
  userSubmittedMap: PropTypes.object,
  user: PropTypes.object,
};

User.propTypes = {
  username: PropTypes.string,
  done: PropTypes.bool,
  classes: PropTypes.object,
  connected: PropTypes.bool,
  isMe: PropTypes.bool,
};

export default connect(mapStateToProps)(withStyles(styles)(WaitingForNextRound));
