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
import { getUser } from './actions/userActions';
import { disconnectSocket } from './actions/gameActions';

class App extends Component {
  componentDidMount() {
    document.body.style.background = colors.background;
    const { dispatch } = this.props;
    dispatch(getUser());
  }

  componentDidUpdate(prevProps) {
    const { location, dispatch } = this.props;
    if (prevProps.location.pathname !== location.pathname) {
      dispatch(disconnectSocket());
      ga(() => {
        const tracker = ga.getAll()[0];
        if (tracker) {
          ga('set', 'page', location.pathname + location.search);
          ga('send', 'pageview');
        }
      });
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/game/:hash" render={(props) => <Game {...props} key={props.match.params.hash} />} exact />
        <Route path="/about" component={About} exact />
        <Route path="/how-to-play" component={HowToPlay} exact />
        <Route path="/contact" component={Contact} exact />
        <Redirect from="*" to="/" />
      </Switch>
    );
  }
}


App.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.string,
};

export default withRouter(connect()(App));
