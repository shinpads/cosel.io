import React, { Component } from 'react';

import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import { withStyles } from '@material-ui/core/styles';
import { parseQuery } from '../util/helperFunctions';
import $ from 'jquery';

import api from '../api';
import colors from '../colors';

import Tree from '../components/Tree';
import Menu from '../components/Menu';
import Snow from '../components/Snow';
import { Building1, Building2, Building3, Building4, Building5, Mountain, Sun, Cloud } from '../components/SVG';
import TitleSection from '../components/TitleSection';
import About from '../components/About';
import Projects from '../components/Projects';
import Games from '../components/Games';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import CloudSvg from '../../public/cloud2.svg';

const BASE_WIDTH = 1500;

const styles = {
  bottomCloud: {
    position: 'relative',
    bottom: '250px',
    maxWidth: '100vw',
    overflow: 'hidden',
    filter: 'blur(10px)',
  },
  mainTitle: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    window.scrollTo(0, 0);
  }

  async componentDidMount () {
    const isMobile = window.innerWidth < 800;
    window.isMobile = isMobile;
    this.setState({ isMobile });
    $(window).resize(() => {
      const isMobile = window.innerWidth < 800;
      window.isMobile = isMobile;
      this.setState({ isMobile });
    });
    window.addEventListener('scroll', () => {
      const parent =document.getElementById('parallax-container');
      const children = parent.querySelectorAll('#parallax-container>.parallax-layer');
      for(let i = 0; i < children.length; i++) {
        children[i].style.transform = 'translateY(-' + (window.pageYOffset * i / children.length) + 'px)';
      }
    }, false);
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2500);
  }
  render() {
    const { classes } = this.props;
    const scale = window.innerWidth / BASE_WIDTH;
    return (
      <div className="page-container">
        <div id="parallax-container">
          <div className="parallax-layer">
            {/*<Sun style={{ top: '-5%', right: '0%' }} scale={0.6} />*/}
          </div>
          <div className="parallax-layer">
            <Mountain scale={0.75} style={{ top: '30%', left:'20%', opacity: '0.5' }}/>
          </div>
          <div className="parallax-layer">
            <Mountain scale={0.85} style={{ top: '30%', left:'40%', opacity: '0.6' }}/>
          </div>
          <div className="parallax-layer">
            <Cloud style={{}} scale={2.8 * scale} />
            <Cloud style={{ top: '5%', right: '30%' }} top={5} scale={2 * scale} />
            <Cloud style={{ top: '15%', right: '10%' }} top={15} scale={3 * scale} />
            <Cloud style={{ top: '8%', right: '60%' }} top={8} scale={2.5 * scale} />
          </div>
          <div className="parallax-layer">
            <Mountain scale={1.2} style={{ top: '30%', left:'0%' }}/>
          </div>
          <div className="parallax-layer">
            {/*<Snow />*/}
          </div>
          <div className="parallax-layer">
            <div className={classes.mainTitle}>
              <div style={{
                fontSize: '18vw',
                fontFamily: "'Alex Brush', cursive",
              }}>Rob Farlow</div>
            </div>
          </div>
        </div>
        <div style={{ minHeight: '100vh' }} />
        <div className={classes.bottomCloud}>
          <object style={{ width: '120%', height: '100%' }} data={CloudSvg} type="image/svg+xml">
            <img src={CloudSvg} />
          </object>
        </div>
        {/*<TitleSection />
        <About />
        <Projects />
        <Games />
        <Footer />*/}
        <div className={'page-loader' + (this.state.loading ? '' : ' not-loading')}>
          <Spinner />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
