import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';

class App extends Component {
  componentDidMount() {
    axios.post('/log-visit');
  }

  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Redirect from="*" to="/" />
      </Switch>
    );
  }
}

export default App;
