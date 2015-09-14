import React, { findDOMNode, PropTypes, Component } from 'react';

class SliderInput extends Component {

  constructor(a,b) {
    super(a,b);
    this.state = {
      value: this.props.value / Math.round(1024*1024)
    };
    this.timer = null;
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({value: value});
    clearInterval(this.timer);
    this.timer = setTimeout(() => this.props.onUpdate(value*1024*1024), 100);
  }

  render() {
    return (
      <span className="SliderInput">
        <span>Show only &gt;</span> <span className="SliderValue">{this.state.value + ' MB'}</span>
        <input type="range" min="1" max="200" defaultValue={this.state.value} onChange={this.handleChange.bind(this)} />
      </span>
      );
  }
}

SliderInput.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

export default SliderInput;
