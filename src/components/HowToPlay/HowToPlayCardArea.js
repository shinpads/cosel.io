import React, { Component } from 'react';
import { Grow } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { HowToPlayCard } from './HowToPlayCard';

const flexBox = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  minWidth: '350px',
};

const cardDiv = {
  display: 'flex',
  justifyContent: 'center',
  flexGrow: '1',
};

export class HowToPlayCardArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCards: false,
    };
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    const { scrollToInstructions } = this.props;
    scrollToInstructions();
  }

  render() {
    const { showCards } = this.state;
    return (
      <div style={flexBox}>
        <Grow in={showCards}>
          <div style={cardDiv}>
            <HowToPlayCard />
          </div>
        </Grow>
        <Grow in={showCards} timeout={1000}>
          <div style={cardDiv}>
            <HowToPlayCard />
          </div>
        </Grow>
        <Grow in={showCards} timeout={2000}>
          <div style={cardDiv}>
            <HowToPlayCard />
          </div>
        </Grow>
      </div>
    );
  }
}

HowToPlayCardArea.propTypes = {
  scrollToInstructions: PropTypes.func.isRequired,
};

export default HowToPlayCardArea;
