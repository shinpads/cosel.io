import React, { Component } from 'react';
import {
  Route, Switch, Redirect, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import colors from './colors';
import Home from './pages/Home';
import Game from './pages/Game';
import About from './pages/About';
import Contact from './pages/Contact';
import HowToPlay from './pages/HowToPlay';
import TermsOfService from './pages/TermsOfService';
import Credits from './pages/Credits';
import { getUser } from './actions/userActions';
import { disconnectSocket } from './actions/gameActions';
import { VideoAd } from './components/Ads/Ad';
import { SET_IS_FIRST_PAGE } from './actions/actionTypes';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    document.body.style.background = colors.background;
    dispatch(getUser());
    dispatch({
      type: SET_IS_FIRST_PAGE,
      payload: true,
    });
    // this is for disabling video ads for the first 3 seconds of page load
    setTimeout(() => {
      dispatch({
        type: SET_IS_FIRST_PAGE,
        payload: false,
      });
    }, 3000);
  }

  componentDidUpdate(prevProps) {
    const { location, dispatch } = this.props;
    if (prevProps.location.pathname !== location.pathname) {
      dispatch(disconnectSocket());
      ga(() => {
        const tracker = ga.getAll()[0];
        if (tracker) {
          tracker.set('page', location.pathname + location.search);
          tracker.send('pageview');
        }
      });
    }
  }

  render() {
    return (
      <>
        <VideoAd key={window.location.pathname} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/game/:hash" render={(props) => <Game {...props} key={props.match.params.hash} />} exact />
          <Route path="/about" component={About} exact />
          <Route path="/how-to-play" component={HowToPlay} exact />
          <Route path="/contact" component={Contact} exact />
          <Route path="/terms-of-service" component={TermsOfService} exact />
          <Route path="/credits" component={Credits} exact />
          <Redirect from="*" to="/" />
        </Switch>
      </>
    );
  }
}


App.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.string,
};

export default withRouter(connect()(App));
