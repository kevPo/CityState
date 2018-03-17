import React, { Component } from 'react';

class CountryDropDown extends Component {
  render() {
    return (
      <ul>
        {this.props.countries.map((country, index) => {
          return (
            <li key={index}>{country.name}</li>
          );
        })}
      </ul>
    );
  }
}

export default CountryDropDown;