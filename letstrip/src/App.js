import React from 'react';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { ProtectedRoute } from './components/ProtectedRoute';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
