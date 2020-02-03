import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import Fade from 'react-reveal/Fade';
// import Flip from 'react-reveal/Flip';
import { withStyles } from '@material-ui/core/styles';

import GameArea from '../components/DrawArea/GameArea';
// import colors from '../colors';

import Header from '../components/Header';

const styles = {
  main: {
    fontSize: '22px',
  },
};

class Game extends Component {
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
          <GameArea />
        </main>
      </div>
    );
  }
}

Game.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Game);
