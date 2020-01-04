import React, { Component } from 'react';
import GamesIcon from '@material-ui/icons/Games';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Fade from 'react-reveal/Fade';
import Button from '@material-ui/core/Button';

import DotsPattern from '../../public/dotspattern.jpg';
import MasonLogo from '../../public/masonlogo.png';
import ResonateLogo from '../../public/resonate.png';
import ReactIcon from '../../public/react.png';
import ElectronIcon from '../../public/electron.png';
import NodeIcon from '../../public/node.png';
import MongoIcon from '../../public/mongodb.png';
import SqlIcon from '../../public/sql.png';
import GoogleMapsIcon from '../../public/googlemaps.png';
import AndroidStudioIcon from '../../public/android.png';

class Games extends Component {
  render() {
    const isMobile = window.innerWidth < 800;
    return(
      <div id="games-section">
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
          <GamesIcon />
          </div>
            Games
          </div>
          <div className="hr" />
          <div style={{
            color: '#rgb(45, 45, 45)',
            textAlign: 'center',
            marginBottom: '1rem',
          }}>
            Heres a showcase of all of  my games. <br />
            All of them are available to play on the
            <a style={{
              cursor: 'pointer',
              fontWeight: 600,
              color: '#1d4b87',
            }}> Mason-Jar Launcher</a> <br />
          </div>
        </Fade>
      </div>
    )
  }
}

export default Games;
