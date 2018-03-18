import React, { Component } from 'react';
import './DropDown.css';

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.defaultSelection,
      listVisible: false
    };
    this.selected = this.selected.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.selected !== nextProps.defaultSelection) {
      const results = nextProps.items.find(item => {
        return item.id === this.state.selected.id;
      });

      if (results === undefined)
        this.setState({
          selected: nextProps.defaultSelection,
          listVisible: false
        })
    }
  }

  selected(item) {
    this.props.onChange(item);
    this.setState({
      selected: item,
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
        <div onClick={this.show} className={"select-current " + (this.state.listVisible ? "active" : "")}>
          { this.state.selected ? this.state.selected.name : this.props.defaultSelection.name }
        </div>
        <ul className={"select-options " + (this.state.listVisible ? "select-options__visible" : "")}>
          {this.props.items.map((item, index) => {
            return (
              <li onClick={() => this.selected(item)} key={index} >{item.name}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default DropDown;