import React from 'react';
import Homepage from './components/Homepage';
import Register from './components/Inscription/Register';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={Homepage} />
          <Route path="/register" exact component={Register} />
        </Router>
      </div>
    );
  }
}

export default App;
