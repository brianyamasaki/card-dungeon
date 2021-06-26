import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import DebugScreenPage from './pages/DebugScreen';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/debugScreen'>
            <DebugScreenPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
