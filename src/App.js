import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.css';
import Navbar from './Navbar';
import ChooseState from './ChooseState';
import AddCountry from './AddCountry';
import AddState from './AddState';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={ChooseState}/>
          <Route path="/addCountry" component={AddCountry}/>
          <Route path="/addState" component={AddState}/>
        </div>
      </Router>
    );
  }
}

export default App;
