import React, { Component } from 'react';
import ComputerIcon from '@material-ui/icons/Computer';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Fade from 'react-reveal/Fade';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

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

class Projects extends Component {
  render() {
    const isMobile = window.innerWidth < 800;
    return(
      <div id="projects-section">
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
          <ComputerIcon />
          </div>
            Projects
          </div>
          <div className="hr" />
          <div style={{
            color: '#808080',
            textAlign: 'center',
            marginBottom: '1rem',
          }}>
            Some of the projects I have made <br />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr' }}>
            <Fade delay={100} bottom>
              <Paper className="project-card">
                <div style={{ marginBottom: '1rem' }}>
                  <img src={MasonLogo} width={100} height={100} />
                </div>
                <div style={{
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  fontSize: '18px',
                  color: '#404040',
                  marginBottom: '1rem',
                }}>
                  Mason-Jar Launcher
                </div>
                <div className="flexbox">
                  <Tooltip title="React">
                    <div className="devtool-icon">
                      <img width={24} height={24} src={ReactIcon}/>
                    </div>
                  </Tooltip>
                    <Tooltip title="Electron">
                    <div className="devtool-icon">
                      <img width={20} height={20} src={ElectronIcon}/>
                    </div>
                  </Tooltip>
                    <Tooltip title="Node">
                    <div className="devtool-icon">
                      <img width={32} height={32} src={NodeIcon}/>
                    </div>
                  </Tooltip>
                    <Tooltip title="MongoDB">
                    <div className="devtool-icon">
                      <img width={24} height={24} src={MongoIcon}/>
                    </div>
                  </Tooltip>
                </div>
                <div className="fullhr" />
                Mason-Jar launcher is a downloader/updater for all of the games
                I have worked on.
                <div className="fullhr" />
                <div style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                  <Button
                    style={{ marginRight: '0.5rem' }}
                    onClick={() => window.open('https://github.com/marshmelllo/masonjar-launcher')}
                  >
                    github
                  </Button>
                  <Button variant="outlined">Try it</Button>
                </div>
              </Paper>
            </Fade>
            <Fade delay={300} bottom>
              <Paper className="project-card">
              <div style={{ marginBottom: '1rem' }}>
              <img src={ResonateLogo} width={100} height={100} />
              </div>
              <div style={{
                textTransform: 'uppercase',
                fontWeight: '600',
                fontSize: '18px',
                color: '#404040',
                marginBottom: '1rem',
              }}>
              Resonate
              </div>
              <div className="flexbox">
                <Tooltip title="Android">
                  <div className="devtool-icon">
                    <img width={24} height={24} src={AndroidStudioIcon}/>
                  </div>
                </Tooltip>
                  <Tooltip title="SQL">
                  <div className="devtool-icon">
                    <img width={24} height={24} src={SqlIcon}/>
                  </div>
                </Tooltip>
                  <Tooltip title="Google Maps">
                  <div className="devtool-icon">
                    <img width={22} height={22} src={GoogleMapsIcon}/>
                  </div>
                </Tooltip>
              </div>
              <div className="fullhr" />
              Resonate was a mobile app that was designed to allow users
              to discover local bands or shows in their area.
              <div className="fullhr" />
              <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Button
                style={{ marginRight: '0.5rem' }}
                onClick={() => window.open('https://github.com/marshmelllo/resonate')}
              >
                github
              </Button>
              </div>
              </Paper>
            </Fade>
            <Fade delay={500} bottom>
              <Paper className="project-card">
                <div style={{ marginBottom: '1rem' }}>
                  <img src={MasonLogo} width={100} height={100} />
                </div>
                <div style={{
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  fontSize: '18px',
                  color: '#404040',
                  marginBottom: '1rem',
                }}>
                  robfarlow.net
                </div>
                <div className="flexbox">
                  <Tooltip title="React">
                    <div className="devtool-icon">
                      <img width={24} height={24} src={ReactIcon}/>
                    </div>
                  </Tooltip>
                    <Tooltip title="Node">
                    <div className="devtool-icon">
                      <img width={32} height={32} src={NodeIcon}/>
                    </div>
                  </Tooltip>
                </div>
                <div className="fullhr" />
                This is my personal website. I designed it using some Material-UI
                assets.
                <div className="fullhr" />
                <div style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                  <Button
                    style={{ marginRight: '0.5rem' }}
                    onClick={() => window.open('https://github.com/marshmelllo/robfarlow.net')}
                  >
                    github
                  </Button>
                  <Button onClick={() => window.location.reload()} variant="outlined">Try it</Button>
                </div>
              </Paper>
            </Fade>
          </div>
        </Fade>
      </div>
    )
  }
}

export default Projects;
