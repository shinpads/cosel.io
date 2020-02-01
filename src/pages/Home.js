import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import Fade from 'react-reveal/Fade';
// import Flip from 'react-reveal/Flip';
import { withStyles } from '@material-ui/core/styles';

import GameSetup from '../components/GameSetup';
// import colors from '../colors';

import Header from '../components/Header';

const styles = {
  main: {
    fontSize: '22px',
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
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <main className={classes.main}>
          <GameSetup />
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Home);
