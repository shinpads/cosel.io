import React, { Component } from 'react';
import { HowToPlayCard } from './HowToPlayCard';

const flexBox = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  minWidth: '350px',
};

export class HowToPlayCardArea extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div style={flexBox}>
        <HowToPlayCard />
        <HowToPlayCard />
        <HowToPlayCard />
      </div>
    );
  }
}

export default HowToPlayCardArea;
