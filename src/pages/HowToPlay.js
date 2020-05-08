import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import setupScreenshot from '../../public/howtoplay/setup.png';
import drawingScreenshot from '../../public/howtoplay/drawing.png';

const styles = {
  root: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    maxWidth: '1000px',
    width: '1000px',
    margin: '0 auto',
    flexGrow: 1,
  },
  title: {
    borderBottom: '1px solid',
  },
  content: {
    fontSize: '1.5rem',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    boxShadow: '2px 2px 8px 0px #d2d2d2',
  },
};

class HowToPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    window.scrollTo(0, 0);
  }

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;
    return (
      <DocumentTitle title="cosel.io - How To Play">
        <div className={classes.root}>
          <Header minimizable />
          <main className={classes.main}>
            <h2 className={classes.title}>
              How To Play
            </h2>
            <div className={classes.content}>
              This game is meant to be played with at least 4 players.
              <h3>Setup</h3>
              <p> Create a game and share the link with your friends for them to join the game.</p>
              <div className={classes.imageContainer}>
                <img className={classes.image} width={500} src={setupScreenshot} alt="setup" />
              </div>
              <p>Once everyone has pressed the ready button, the game will begin.</p>
              <h3>Playing</h3>
              <p>
                Once the game has started, it will prompt you eith to draw something, or guess something.
              </p>
              <div className={classes.imageContainer}>
                <img className={classes.image} width={500} src={drawingScreenshot} alt="setup" />
              </div>
              <p>This repeats over and over until the game is finished</p>
            </div>
          </main>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

HowToPlay.propTypes = {
  classes: PropTypes.object,
};

export default connect()(withStyles(styles)(HowToPlay));
