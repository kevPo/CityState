import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav>
        <ul className="container">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/addCountry">Add Country</Link></li>
          <li><Link to="/addState">Add State</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
