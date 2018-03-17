import React, { Component } from 'react';

class CountryDropDown extends Component {
  render() {
    return (
      <ul>
        {this.props.countries.map((country, index) => {
          return (
            <li onClick={() => this.props.onChange(country.code)} key={index} >{country.name}</li>
          );
        })}
      </ul>
    );
  }
}

export default CountryDropDown;