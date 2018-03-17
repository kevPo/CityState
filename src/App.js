import React, { Component } from 'react';
import CountryDropDown from './CountryDropDown';
import StateDropDown from './StateDropDown';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      states: []
    };
    this.countrySelected = this.countrySelected.bind(this);
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

  render() {
    return (
      <div className="App">
        <CountryDropDown onChange={this.countrySelected} countries={this.state.countries} />
        <StateDropDown states={this.state.states} />
      </div>
    );
  }
}

export default App;
