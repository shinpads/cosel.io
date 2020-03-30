import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import colors from '../colors';
import { createGame, findGame, getGames } from '../actions/gameActions';
import { PrimaryButton } from '../components/Base/Button';
import { Spinner } from '../components/Base/Loader';
import Header from '../components/Header';
import RecentGames from '../components/Home/RecentGames';

const styles = {
  root: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
  },
  main: {
    fontSize: '22px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  info: {
    minHeight: '40vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.backgroundContrast,
    fontSize: '2rem',
    padding: '1rem',
    '@media (min-height: 600px)': {
      fontSize: '3rem',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  loader: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  recentGamesContainer: {
    margin: '1rem 2rem',
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getGames());
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
    const { classes, recentGames, recentGamesLoaded } = this.props;
    if (!recentGamesLoaded) {
      return (
        <div className={classes.loader}>
          <Spinner />
        </div>
      );
    }
    return (
      <div className={classes.root}>
        <Header minimizable />
        <main className={classes.main}>
          <div className={classes.info}>
            <div style={{ textAlign: 'center' }}>Draw a picture and have other people guess it</div>
          </div>
          <div className={classes.buttonContainer}>
            <PrimaryButton
              variant="contained"
              onClick={this.createNewGame}
            >
              Create Game
            </PrimaryButton>
          </div>
          <div className={classes.recentGamesContainer}>
            <h2 style={{ borderBottom: '1px solid', fontWeight: 500 }}>Recent Games</h2>
            <RecentGames recentGames={recentGames} />
          </div>
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object,
  dispatch: PropTypes.func,
  recentGamesLoaded: PropTypes.bool,
  recentGames: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    recentGames: state.game.recentGames,
    recentGamesLoaded: state.game.recentGamesLoaded,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Home));
