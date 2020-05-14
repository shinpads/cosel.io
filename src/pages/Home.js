import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import colors from '../colors';
import { createGame, getGames } from '../actions/gameActions';
import { getPublicGame } from '../api';
import { PrimaryButton } from '../components/Base/Button';
import { Spinner } from '../components/Base/Loader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecentGames from '../components/Home/RecentGames';
import history from '../history';
import artSvg from '../../public/art.svg';
import globeSvg from '../../public/globe.svg';
import friendsSvg from '../../public/friends.svg';

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
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
    '@media(max-width: 1000px)': {
      maxWidth: '100%',
    },
  },
  info: {
    textAlign: 'center',
    color: colors.backgroundContrast,
    padding: '1rem',
    marginBottom: '3rem',
    display: 'flex',
    '@media(max-width: 600px)': {
      marginBottom: '1rem',
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
    marginTop: '2rem',
    '@media(max-width: 960px)': {
      padding: '0 2rem',
    },
  },
  actionsContainer: {
    display: 'grid',
    textAlign: 'center',
    gridTemplateColumns: '1fr 0fr 1fr',
    marginBottom: '2rem',
    '@media(max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
    '@media(max-width: 960px)': {
      padding: '0 2rem',
    },
  },
  middleSeperator: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 2rem',
    flexGrow: 1,
    width: '1px',
    borderRight: '2px dashed #000',
    '@media(max-width: 600px)': {
      flexDirection: 'row',
      alignItems: 'center',
      margin: '2rem 0rem',
      height: '1px',
      borderBottom: '2px dashed #000',
      width: 'unset',
      borderRight: 0,
    },
  },
  art: {
    justifySelf: 'center',
    '@media (max-width: 960px)': {
      display: 'none',
    },
  },
  gameTypeHeader: {
    whiteSpace: 'nowrap',
  },
  titleContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 0fr 1fr',
    alignItems: 'center',
    '@media(max-width: 960px)': {
      display: 'block',
    },
  },
  gameTypeIcon: {
    justifySelf: 'center',
  },
  mainHeader: {
    whiteSpace: 'nowrap',
    '@media(max-width: 600px)': {
      whiteSpace: 'unset',
    },
  },
  gameTypeContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  greyText: {
    color: colors.darkGrey,
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getGames());
  }

  createNewGame = () => {
    const { dispatch } = this.props;
    dispatch(createGame());
  }

  findPublicGame = async () => {
    const game = await getPublicGame();
    if (game && game.hash) {
      history.push(`/game/${game.hash}`);
    } else {
      // TODO: do some error or something
    }
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
      <DocumentTitle title="cosel.io - Broken Telephone Drawing Game">
        <div className={classes.root}>
          <Header minimizable />
          <main className={classes.main}>
            <div className={classes.info}>
              <div style={{ flexGrow: 1 }}>
                <div className={classes.titleContainer}>
                  <img className={classes.art} alt="" width={100} src={artSvg} />
                  <h2 className={classes.mainHeader}>Communicate using only drawings</h2>
                </div>
                <div className={classes.greyText}>
                  A drawing version of the broken telephone game. Try and communicate a word through a group of friends using drawings. Play with friends online!
                </div>
              </div>
            </div>
            <div className={classes.actionsContainer}>
              <div className={classes.gameTypeContainer}>
                <div className={classes.titleContainer}>
                  <img className={classes.gameTypeIcon} alt="" width={50} src={friendsSvg} />
                  <h3 className={classes.gameTypeHeader}>Create a private game</h3>
                </div>
                <div className={classes.greyText} style={{ marginBottom: '2rem' }}>
                  Create a new game and invite your friends using the link
                </div>
                <PrimaryButton
                  variant="contained"
                  fullWidth
                  onClick={this.createNewGame}
                  style={{ width: '100%', margin: 0 }}
                >
                  Create Game
                </PrimaryButton>
              </div>
              <div className={classes.middleSeperator} />
              <div className={classes.gameTypeContainer}>
                <div className={classes.titleContainer}>
                  <img className={classes.gameTypeIcon} alt="" width={50} src={globeSvg} />
                  <h3 className={classes.gameTypeHeader}>Join public game</h3>
                </div>
                <div className={classes.greyText} style={{ marginBottom: '2rem', flexGrow: 1 }}>
                  Play with random people from around the world
                </div>
                <PrimaryButton
                  variant="contained"
                  fullWidth
                  onClick={this.findPublicGame}
                  style={{ width: '100%', margin: 0 }}
                >
                  Join Game
                </PrimaryButton>
              </div>
            </div>
            <div className={classes.recentGamesContainer}>
              <h3 style={{ borderBottom: '2px dashed' }}>Recent Games</h3>
              <RecentGames recentGames={recentGames} />
            </div>
          </main>
          <Footer />
        </div>
      </DocumentTitle>
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
