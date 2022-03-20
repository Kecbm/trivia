import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import GamePage from './pages/GamePage';
import FeedbackPage from './pages/FeedbackPage';
import RankingPage from './pages/RankingPage';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/ranking" component={ RankingPage } />
        <Route exact path="/results" component={ FeedbackPage } />
        <Route exact path="/game" component={ GamePage } />
        <Route exact path="/settings" component={ SettingsPage } />
        <Route exact path="/" component={ LoginPage } />
      </Switch>
    );
  }
}

export default App;
