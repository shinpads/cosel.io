import React, { Component } from 'react';
import { Collapse } from '@material-ui/core';
import { HowToPlayCardArea } from './HowToPlayCardArea';
import { HowToPlaySummary } from './HowToPlaySummary';

const divStyle = {
  marginTop: '100px',
};

const cardMargin = {
  marginTop: '275px',
  marginBottom: '20%',
};

export class HowToPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseCards: false,
    };
    this.cardsDiv = React.createRef();
    this.cards = React.createRef();
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    const cardsDiv = this.cardsDiv.current;
    cardsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  expandDetails = () => {
    const cards = this.cards.current;
    cards.setState({
      showCards: true,
    });
    this.setState({
      collapseCards: true,
    });
  }

  render() {
    const { collapseCards } = this.state;
    return (
      <div style={divStyle}>
        <HowToPlaySummary expandDetails={this.expandDetails} />
        <Collapse in={collapseCards} timeout={0}>
          <div style={cardMargin} ref={this.cardsDiv}>
            <HowToPlayCardArea ref={this.cards} />
          </div>
        </Collapse>
      </div>
    );
  }
}

export default HowToPlay;
