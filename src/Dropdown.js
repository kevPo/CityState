import React, { Component } from 'react';
import './DropDown.css';

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {name: this.props.defaultText},
      listVisible: false
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  selected(country) {
    this.props.onChange(country.code);
    this.setState({
      selected: country,
      listVisible: false
    });
  }

  show() {
    this.setState({
      selected: this.state.selected,
      listVisible: true
    });
    document.addEventListener("click", this.hide);
  }

  hide() {
    this.setState({
      selected: this.state.selected,
      listVisible: false
    });
    document.removeEventListener("click", this.hide);
  }

  render() {
    return (
      <div className="select">
        <div onClick={this.show} className={"select-current " + (this.state.listVisible ? "active" : "")}>{this.state.selected.name}</div>
        <ul className={"select-options " + (this.state.listVisible ? "select-options__visible" : "")}>
          {this.props.items.map((country, index) => {
            return (
              <li onClick={() => this.selected(country)} key={index} >{country.name}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default DropDown;