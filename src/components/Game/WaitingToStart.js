import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { PrimaryButton } from '../Base/Button';
import { startGame } from '../../actions/gameActions';
import colors from '../../colors';
import { Copy } from '../Base/Icons';
import { copyTextToClipboard } from '../../util/helperFunctions';

const styles = theme => ({
  info: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: colors.backgroundContrast,
    fontSize: '2rem',
  },
  playerList: {
    overflow: 'auto',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    color: colors.backgroundContrast,
    border: '1px solid',
    padding: '0.5rem',
    fontSize: '1.25rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem',
    },
  },
  linkContainer: {
    paddingBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  waitingForHost: {
    color: colors.backgroundContrast,
    fontSize: '1rem',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  copyLink: {
    fill: colors.primary,
    marginRight: '0.5rem',
    transform: 'scale(1)',
    [theme.breakpoints.up('sm')]: {
      transform: 'scale(1.25)',
    },
  },
  copyLinkButton: {
    cursor: 'pointer',
    backgroundColor: colors.primaryContrast,
    padding: '0.5rem',
    paddingRight: '0.75rem',
    color: colors.primary,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
    fontSize: '1.25rem',
    flexGrow: 2,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem',
    },
  },
  snackbarContent: {
    backgroundColor: colors.primaryContrast,
    color: colors.primary,
  },
});
class WaitingToStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: false,
    };
  }

  sendStartGame = () => {
    const { dispatch } = this.props;
    dispatch(startGame());
  };

  copyUrl = () => {
    copyTextToClipboard(window.location.href);
    this.setState({ snackbarOpen: true });
  };

  render() {
    const {
      game,
      users,
      user,
      classes,
    } = this.props;

    const { snackbarOpen } = this.state;

    const isHost = game.host === user._id;

    return (
      <>
        <Snackbar
          open={snackbarOpen}
          onClose={() => this.setState({ snackbarOpen: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          message="Link copied to clipboard"
          ContentProps={{ className: classes.snackbarContent }}
        />
        <div className={classes.linkContainer}>
          <div className={classes.link}>cosel.io/game/{game.hash}</div>
          <div role="button" onClick={this.copyUrl} tabIndex={0} className={classes.copyLinkButton}>
            <Copy size={32} className={classes.copyLink} />
            <div>Copy</div>
          </div>
        </div>
        {!isHost && <div className={classes.waitingForHost}>Waiting for host to start game</div>}
        <div className={classes.info}>
          <div className={classes.playerList}>
            {users.map(u => <div>{u.username} {u._id === game.host ? '[Host]' : ''}</div>)}
          </div>
        </div>
        <div>
          {isHost && <PrimaryButton onClick={this.sendStartGame}>Start Game</PrimaryButton>}
        </div>
      </>
    );
  }
}

WaitingToStart.propTypes = {
  game: PropTypes.object,
  users: PropTypes.array,
  user: PropTypes.object,
  dispatch: PropTypes.func,
  classes: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    game: state.game.game,
    users: state.game.game.users,
    user: state.user.user,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(WaitingToStart));
