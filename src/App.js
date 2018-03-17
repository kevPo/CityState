import React, { Component } from 'react';
import Dropdown from './Dropdown';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      states: []
    };
    this.countrySelected = this.countrySelected.bind(this);
    this.stateSelected = this.stateSelected.bind(this);
  }

  componentDidMount() {
    fetch('https://xc-ajax-demo.herokuapp.com/api/countries')
    .then(response => response.json())
    .then(data => {
      this.setState({
        countries: data
      });
    });
  }

  countrySelected(countryCode) {
    fetch(`https://xc-ajax-demo.herokuapp.com/api/countries/${countryCode}/states`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        states: data
      });
    });
  }

  stateSelected(state) {

  }

  render() {
    return (
      <div className="App">
        <Dropdown onChange={this.countrySelected} items={this.state.countries} defaultText="Select Country" />
        <Dropdown onChange={this.stateSelected} items={this.state.states} defaultText="Select State" />
      </div>
    );
  }
}

export default App;
