import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import colors from './colors';
import Home from './pages/Home';
import Game from './pages/Game';
import { getUser } from './actions/userActions';

class App extends Component {
  componentDidMount() {
    document.body.style.background = colors.background;
    const { dispatch } = this.props;
    dispatch(getUser());
  }

  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/game/:hash" component={Game} exact />
        <Redirect from="*" to="/" />
      </Switch>
    );
  }
}


App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(App);
