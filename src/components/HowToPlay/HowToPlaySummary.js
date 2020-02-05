import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import colors from '../../colors';

const center = {
  textAlign: 'center',
  margin: '10px',
};

export class HowToPlaySummary extends Component {
  componentDidMount() {

  }

  render() {
    const { expandDetails } = this.props;
    return (
      <div style={center}>
        <Typography variant="h6">Guess what the previous person drew, and re-create it for the next person to do the same.</Typography>
        <Button color={colors.primary} variant="contained" disableElevation onClick={() => expandDetails()}>More Details Please</Button>
      </div>
    );
  }
}

HowToPlaySummary.propTypes = {
  expandDetails: PropTypes.func.isRequired,
};

export default HowToPlaySummary;
