import React, { PropTypes, Component } from 'react';

class DirectoryBar extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      path: this.props.path || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({path: nextProps.path});
  }

  handleClick(e) {
    this.props.onSetPath(this.state.path);
  }

  handleEnter(e) {
    if(e.which === 13){
      this.handleClick();
    }
  }

  handleChange(e) {
    this.setState({path: e.target.value});
  }

  render() {
    const { onSetPath } = this.props;
    return (
      <div className="DirectoryBar">
        <input type="text" value={this.state.path} onChange={this.handleChange.bind(this)} onKeyDown={this.handleEnter.bind(this)} />
        <button onClick={this.handleClick.bind(this)}>Go</button>
      </div>
    );
  }
}

DirectoryBar.propTypes = {
  path: PropTypes.string.isRequired,
  onSetPath: PropTypes.func.isRequired
};


export default DirectoryBar;
