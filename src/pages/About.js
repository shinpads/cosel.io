import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
};

class About extends Component {
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
      <DocumentTitle title="cosel.io - About">
        <div className={classes.root}>
          <Header minimizable />
          <main className={classes.main}>
            <h2 className={classes.title}>
              <div>
                About
                <div />
              </div>
            </h2>
            <div className={classes.content}>
              <p>
                cosel.io is a drawing game based on the game {' '} <a href="https://boardgamegeek.com/boardgame/46213/telestrations" target="_blank" rel="noopener noreferrer">Telestrations</a>.
                It was made during the quarantine period of COVID-19 so that people could still play with their friends and family.

              </p>
            </div>
          </main>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object,
};

export default connect()(withStyles(styles)(About));
