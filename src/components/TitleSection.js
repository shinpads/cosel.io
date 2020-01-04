import React, { Component } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import Fade from 'react-reveal/Fade';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import LinkedInIcon from '../../public/linkedin.svg'
import GithubIcon from '../../public/github.svg'

const styles = {
  button: {
    color: '#19b5ff',
    backgroundColor: 'white',
  }
};

class TitleSection extends Component {
  render() {
    const { classes } = this.props;
    return(
      <div id="title-section">
          <div
            onClick={() => window.open('https://github.com/shinpads')}
          >
          <img
            className="top-icon"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              filter: 'invert(100%)',
              opacity: 0.25,
            }}
            src={GithubIcon}
            width={24}
            height={24}
          />
        </div>
          <div style={{
            textTransform: 'uppercase',
            fontWeight: '600',
            fontSize: '42px',
            display: 'flex',
            alignItems: 'center',
            color: '#afafaf',
          }}>
            Rob Farlow
          </div>
          <div className="hr" style={{ backgroundColor: '#afafaf' }}/>
          <div style={{
            color: '#afafaf',
            textAlign: 'center',
          }}>
            Software Engineer  <br /> <br />
          </div>
          <div style={{ marginTop: '4rem' }}>
            {/*<Button
              className={classes.button}
              disableRipple
              variant="contained"
              onClick={() => {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#about-section").offset().top
                }, 1000);
              }}
            >
              Learn more
            </Button>*/}
          </div>
      </div>
    )
  }
}

export default withStyles(styles)(TitleSection);
