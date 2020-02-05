import React, { Component } from 'react';
import { Grow, Button } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { HowToPlayCard } from './HowToPlayCard';
import colors from '../../colors';

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

const buttonStyle = {
  marginTop: '20px',
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

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  render() {
    const { showCards } = this.state;
    return (
      <div>
        <div style={flexBox}>
          <Grow in={showCards} timeout={1000}>
            <div style={cardDiv}>
              <HowToPlayCard text="This is an example rule of the game. It is the first step to follow when playing the game." />
            </div>
          </Grow>
          <Grow in={showCards} timeout={2000}>
            <div style={cardDiv}>
              <HowToPlayCard text="This is an example rule of the game. It is the second step to follow when playing the game." />
            </div>
          </Grow>
          <Grow in={showCards} timeout={4000}>
            <div style={cardDiv}>
              <HowToPlayCard text="This is an example rule of the game. It is the third step to follow when playing the game." />
            </div>
          </Grow>
        </div>
        <div>
          <Button style={buttonStyle} color={colors.secondary} variant="contained" disableElevation onClick={() => this.scrollToTop()}>Back to top</Button>
        </div>
      </div>
    );
  }
}

HowToPlayCardArea.propTypes = {
  scrollToInstructions: PropTypes.func.isRequired,
};

export default HowToPlayCardArea;
