import React from 'react';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import MainRoadMap from './components/MainRoadMap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
            <ProtectedRoute exact path='/mainRoadmap/:id' component={MainRoadMap} />
            <ProtectedRoute exact path='/profile/:id' component={Profile} />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
