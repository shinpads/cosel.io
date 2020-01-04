import React, { Component } from 'react';
import Home from './pages/Home';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
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
