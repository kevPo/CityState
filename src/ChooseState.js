import React, { Component } from 'react';
import Dropdown from './Dropdown';

class ChooseState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      states: [],
      selectedCountry: {name: 'Select Country', id: -1},
      selectedState: {name: 'Select State', id: -1},
      formattedSelection: ''
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

      var countries = filteredCountries.sort((a, b) => a.name.localeCompare(b.name));
      this.setState({
        countries,
        selectedCountry: { name: "Select Country" }
      });
    });
  }

  countrySelected(country) {
    const selectedCountry = country;
    const formattedSelection = '';
    fetch(`https://xc-ajax-demo.herokuapp.com/api/countries/${country.code}/states`)
    .then(response => response.json())
    .catch(error => {
      console.error(error);
      this.setState({
        states: [],
        selectedState: { name: 'No States Found' },
        selectedCountry,
        formattedSelection
      });
    })
    .then(data => {
      if (data !== undefined && data.length > 0) {
        var states = data.sort((a, b) => a.name.localeCompare(b.name));
        this.setState({
          states,
          selectedState: data[0],
          selectedCountry,
          formattedSelection
        });
      }
      else {
        this.setState({
          states: [],
          selectedState: { name: 'No States Found', id: -1 },
          selectedCountry,
          formattedSelection
        })
      }
    });
  }

  stateSelected(state) {
    this.setState({
      formattedSelection: `${this.state.selectedCountry.name} - ${state.name}`
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1>CHOOSE YOUR STATE</h1>
        </div>
        <div className="container">
          <Dropdown onChange={this.countrySelected} items={this.state.countries} defaultSelection={this.state.selectedCountry} />
          <Dropdown onChange={this.stateSelected} items={this.state.states} defaultSelection={this.state.selectedState} />
        </div>
        <div className="container">
          <p>{this.state.formattedSelection || ''}</p>
        </div>
      </div>
    );
  }
}

export default ChooseState;