import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import GamePage from './pages/GamePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/game">
            <GamePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
