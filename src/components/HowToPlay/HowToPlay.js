import React, { Component } from 'react';
import { HowToPlayCardArea } from './HowToPlayCardArea';
import { HowToPlaySummary } from './HowToPlaySummary';

export class HowToPlay extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <HowToPlaySummary />
        <HowToPlayCardArea />
      </div>
    );
  }
}

export default HowToPlay;
