import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DropDown from './Dropdown';

class AddState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      country: {name: 'Select Country'},
      code: '',
      name: '',
      response:  ''
    };
    
    this.countrySelected = this.countrySelected.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        country: { name: "Select Country" },
        response: ''
      });
    });
  }

  countrySelected(country) {
    this.setState({country, response: ''});
  }

  handleCodeChange(event) {
    this.setState({code: event.target.value, response: ''});
  }

  handleNameChange(event) {
    this.setState({name: event.target.value, response: ''});
  }

  handleSubmit() {
    // validate code doesn't exist
    // validate state name doesn't exist

    fetch('https://xc-ajax-demo.herokuapp.com/api/states', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        code: this.state.code,
        name: this.state.name,
        countryId: this.state.country.id
      })
    })
    .then(response => {
      console.log('success');
      console.log(response);

      if (response.status === 200) {
        const response = `🎊 ${this.state.name} was added to ${this.state.country.name}! 🎊`;
        this.setState({
          country: {name: 'Select Country'},
          code: '',
          name: '',
          response
        })
      }
    })
    .catch(error => {
      console.log('error');
      console.error(error);
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1>Add State</h1>
        </div>
          <div className="container">
            <DropDown onChange={this.countrySelected} items={this.state.countries} defaultSelection={this.state.country} />
          </div>
          <div className="container">
            <div>
              <p className="label">Code</p>
              <input maxLength="3" className="short" type="text" value={ this.state.code } onChange={this.handleCodeChange} />
            </div>
            <div>
              <p className="label">Name</p>
              <input type="text" value={ this.state.name } onChange={this.handleNameChange} />
            </div>
          </div>
          <div className="container buttons">
            <Link className="button" to='/'>Cancel</Link>
            <button className="button" onClick={this.handleSubmit}>Add</button>
          </div>
          <div className="container">
            <p className="feedback">{this.state.response}</p>
          </div>
      </div>
    );
  }
}

export default AddState;