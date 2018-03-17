import React, { Component } from 'react';

class StateDropDown extends Component {
  render() {
    return (
      <div>
        <h1>States</h1>
        <ul>
          {this.props.states.map((state, index) => {
            return (
              <li key={index}>{state.name}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default StateDropDown;