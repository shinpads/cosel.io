import React, { Component } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';

const cardStyle = {
  border: '1px solid #DCDCDC',
  width: '350px',
};

export class HowToPlayCard extends Component {
  componentDidMount() {

  }

  render() {
    const { text } = this.props;
    return (
      <div>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="body1" color="textPrimary" gutterBottom>
              {text}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

HowToPlayCard.propTypes = {
  text: PropTypes.string,
};

export default HowToPlayCard;
