import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import Fade from 'react-reveal/Fade';
// import Flip from 'react-reveal/Flip';
import { withStyles } from '@material-ui/core/styles';

// import api from '../api';
// import colors from '../colors';

const styles = {
  test: {
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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.test}>
        test 123
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Home);
