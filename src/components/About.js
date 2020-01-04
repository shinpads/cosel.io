import React, { Component } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import Fade from 'react-reveal/Fade';

class About extends Component {
  render() {
    return(
      <div id="about-section">
        <Fade>
          <div style={{
            textTransform: 'uppercase',
            fontWeight: '600',
            fontSize: '22px',
            color: '#404040',
            display: 'flex',
            alignItems: 'center',
          }}>
          <div style={{
            transform: 'scale(1.5)',
            color: '#232323',
            marginRight: '1rem',
          }}>
          <PersonIcon />
          </div>
            About
          </div>
          <div className="hr" />
          <div style={{
            color: '#808080',
            textAlign: 'center',
          }}>
            I am a Computer Engineering student <br />
            studying at the University of Waterloo. <br />
          </div>
        </Fade>
      </div>
    )
  }
}

export default About;
