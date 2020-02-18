import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {

  },
};

class GameResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>game results here</div>
    );
  }
}


export default connect()(withStyles(styles)(GameResults));
