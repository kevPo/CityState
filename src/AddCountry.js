import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      name: '',
      response: ''
    };
    
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCodeChange(event) {
    this.setState({code: event.target.value, response: ''});
  }

  handleNameChange(event) {
    this.setState({name: event.target.value, response: ''});
  }

  handleSubmit() {
    // validate code doesn't exist
    // validate country name doesn't exist

    fetch('https://xc-ajax-demo.herokuapp.com/api/countries', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        code: this.state.code,
        name: this.state.name
      })
    })
    .then(response => {
      const feedback = `🎊 ${this.state.name} was added! 🎊`;
      
      if (response.status === 200) {
        this.setState({
          code: '',
          name: '',
          response: feedback
        });
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
          <h1>Add Country</h1>
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

export default AddCountry;