import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Done } from '@material-ui/icons';
import { PrimaryButton } from '../Base/Button';
import { startGame, sendReady } from '../../actions/gameActions';
import colors from '../../colors';
import CopyLink from './CopyLink';
import { DotDotDot } from '../Base/Loader';
import MyUsername from '../MyUsername';
import { BannerAd } from '../Ads/Ad';

const styles = {
  info: {
    flexGrow: 1,
    display: 'flex',
    color: colors.backgroundsContrast,
    fontSize: '2rem',
    maxWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '@media(max-width: 600px)': {
      padding: '0 1rem',
    },
  },
  playerList: {
    flexGrow: 1,
    padding: '1rem',
    paddingBottom: '0rem',
    overflow: 'auto',
    width: '100%',
    maxWidth: '500px',
  },
  waitingForHost: {
    color: colors.backgroundContrast,
    fontSize: '1rem',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  playerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  playerName: {
    fontSize: '2rem',
    flexGrow: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  playerStatus: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: '2rem',
  },
  playerCountWarning: {
    color: 'red',
    fontSize: '1rem',
    maxWidth: '500px',
    textAlign: 'center',
  },
};
class WaitingToStart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendStartGame = () => {
    const { dispatch } = this.props;
    dispatch(startGame());
  };

  ready = (ready) => {
    const { dispatch } = this.props;
    dispatch(sendReady(ready));
  }

  render() {
    const {
      users,
      user,
      classes,
      userReadyMap,
    } = this.props;
    const isReady = !!userReadyMap[user._id];
    return (
      <DocumentTitle title="cosel.io - Waiting for players">
        <>
          <CopyLink url={window.location.href} displayUrl={window.location.host + window.location.pathname} />
          <div className={classes.info}>
            {users.length < 4 && <div className={classes.playerCountWarning}>This game is meant to be played with at least 4 players. Copy the link above and send it to your friends for them to join the game.</div>}
            <div className={classes.playerList}>
              {users.map(u => (
                <div className={classes.playerContainer}>
                  {u._id === user._id
                    ? (<MyUsername username={user.username} textClass={classes.playerName} style={{ flexGrow: 1 }} />)
                    : (<div className={classes.playerName}>{u.username}</div>)}
                  <div className={classes.playerStatus}>{userReadyMap[u._id] ? <Done /> : <DotDotDot />}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={classes.buttonContainer}>
            {isReady
              ? <PrimaryButton onClick={() => this.ready(false)}>Unready</PrimaryButton>
              : <PrimaryButton onClick={() => this.ready(true)}>Ready</PrimaryButton>}
          </div>
          <BannerAd />
        </>
      </DocumentTitle>
    );
  }
}

WaitingToStart.propTypes = {
  users: PropTypes.array,
  user: PropTypes.object,
  dispatch: PropTypes.func,
  classes: PropTypes.object,
  userReadyMap: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    game: state.game.game,
    users: state.game.game.users,
    user: state.user.user,
    userReadyMap: state.game.userReadyMap,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(WaitingToStart));
