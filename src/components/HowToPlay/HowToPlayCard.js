import React, { Component } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const cardStyle = {
  border: '1px solid #DCDCDC',
  width: '350px',
};

const divStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexGrow: '1',
};

export class HowToPlayCard extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div style={divStyle}>
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
