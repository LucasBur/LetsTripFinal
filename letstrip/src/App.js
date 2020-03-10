import React from 'react';
import Homepage from './components/Homepage';
import RoadMapList from './components/RoadMapList';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={Homepage} />
          <Route path="/Navbar" exact component={RoadMapList} />          
        </Router>
      </div>
    );
  }
}

export default App;
