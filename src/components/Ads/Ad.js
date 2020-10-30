/* eslint-disable */
import React, { Component } from 'react';
import { withStyles} from '@material-ui/core/styles';
import connect from 'react-redux';
import { store } from '../../store';
import { SET_VIDEO_AD_SHOWING } from '../../actions/actionTypes';

const styles = {
  videoAdContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: '#fff',
    zIndex: 100000,
  },
  sideBoxAd: {
    position: 'fixed',
    top: 'calc(50% - 300px)',
    right: 'calc((100% - 1600px) / 4)',
    width: '300px',
    height: '600px',
  },
  bannerAd: {
    display: 'flex',
    justifyContent: 'center',
  }
};

class VideoAdComponent extends Component {
  componentDidMount() {
    if (window.aipDisplayTag) {
      window.aiptag.cmd.player.push(function() {
      	window.adplayer = new aipPlayer({
      		AD_WIDTH: 960,
      		AD_HEIGHT: 540,
      		AD_FULLSCREEN: false,
      		AD_CENTERPLAYER: window.innerWidth > 960,
      		LOADING_TEXT: 'loading advertisement',
      		PREROLL_ELEM: function(){return document.getElementById('preroll')},
      		AIP_COMPLETE: function ()  {
            store.dispatch({
              type: SET_VIDEO_AD_SHOWING,
              payload: false,
            });
      		},
      		AIP_REMOVE: function ()  {
      			// Here it's save to remove the PREROLL_ELEM from the page if you want. But it's not recommend.
      		}
      	});
      });
    } else {
      store.dispatch({
        type: SET_VIDEO_AD_SHOWING,
        payload: false,
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div id="preroll" />
    );
  }
}

export function playVideoAd () {
  if (window.aipDisplayTag && window.adplayer) {
    store.dispatch({
      type: SET_VIDEO_AD_SHOWING,
      payload: true,
    });
    window.aiptag.cmd.player.push(function() { window.adplayer.startPreRoll(); });
  }
}

export class BannerAdComponent extends Component {
  componentDidMount() {
    if (window.aipDisplayTag) {
      window.aipDisplayTag.display('cosel-io_970x90');
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.bannerAd} id="cosel-io_970x90" />
    );
  }
}

export class BoxAd extends Component {
  componentDidMount() {
    if (window.aipDisplayTag) {
      window.aipDisplayTag.display('cosel-io_300x600');
    }
  }
  render() {
    return (
      <div style={{ margin: 'auto' }} id="cosel-io_300x600" />
    );
  }
}

class SideBoxAdComponent extends Component {
  constructor(props) {
    super(props);
    const SIDE_BOX_AD_MIN_SCREEN_WIDTH = 1600;
    this.show = false;
    if (window && window.innerWidth >= SIDE_BOX_AD_MIN_SCREEN_WIDTH) {
      this.show = true;
    }
  }

  render () {
    const { classes } = this.props;
    if (!this.show) return null;
    return (
      <div className={classes.sideBoxAd}>
        <BoxAd />
      </div>
    );
  }
}

export const SideBoxAd = withStyles(styles)(SideBoxAdComponent);
export const BannerAd = withStyles(styles)(BannerAdComponent);
export const VideoAd = withStyles(styles)(VideoAdComponent);
