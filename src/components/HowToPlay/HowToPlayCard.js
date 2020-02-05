import React, { Component } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const cardStyle = {
  border: '1px solid #DCDCDC',
  width: '350px',
};

export class HowToPlayCard extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h4" color="textPrimary" gutterBottom>
              Test
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default HowToPlayCard;
