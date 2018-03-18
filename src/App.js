import React, { Component } from 'react';
import Dropdown from './Dropdown';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      states: [],
      selectedCountry: {name: 'Select Country', id: -1},
      selectedState: {name: 'Select State', id: -1}
    };
    this.countrySelected = this.countrySelected.bind(this);
    this.stateSelected = this.stateSelected.bind(this);
  }

  componentDidMount() {
    fetch('https://xc-ajax-demo.herokuapp.com/api/countries')
    .then(response => response.json())
    .catch(error => {
      console.error('error fetching countries');
      console.error(error);
    })
    .then(data => {
      if (data === undefined)
        return;

      const filteredCountries = data.filter(country => {
        return country.name.trim() !== '';
      });

      this.setState({
        countries: filteredCountries,
        selectedCountry: { name: "Select Country!" }
      });
    });
  }

  countrySelected(country) {
    fetch(`https://xc-ajax-demo.herokuapp.com/api/countries/${country.code}/states`)
    .then(response => response.json())
    .catch(error => {
      console.error(error);
      this.setState({
        states: [],
        selectedState: { name: 'No States Found' }
      });
    })
    .then(data => {
      if (data !== undefined && data.length > 0) {
        this.setState({
          states: data,
          selectedState: data[0]
        });
      }
      else {
        this.setState({
          states: [],
          selectedState: { name: 'No States Found', id: -1 }
        })
      }

      
    });
  }

  stateSelected(state) {

  }

  render() {
    return (
      <div>
        <div className="container">
          <h1>HOW FAR IS...</h1>
        </div>
        <div className="container">
          <Dropdown onChange={this.countrySelected} items={this.state.countries} defaultSelection={this.state.selectedCountry} />
          <Dropdown onChange={this.stateSelected} items={this.state.states} defaultSelection={this.state.selectedState} />
        </div>
      </div>
    );
  }
}

export default App;
