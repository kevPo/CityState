import React, { Component } from 'react';
import CountryDropDown from './CountryDropDown';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
    };
  }

  componentDidMount() {
    let component = this;

    fetch('https://xc-ajax-demo.herokuapp.com/api/countries')
    .then(response => response.json())
    .then(data => {
      component.setState({
        countries: data
      });
    });
  }

  render() {
    return (
      <div className="App">
        <CountryDropDown countries={this.state.countries} />
      </div>
    );
  }
}

export default App;
