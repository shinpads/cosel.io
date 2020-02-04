import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';

class App extends Component {
  componentDidMount() {
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

export default App;
