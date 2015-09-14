import React, { PropTypes, Component } from 'react';
var ipc = electronRequire('ipc');

class DirectoryBar extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      path: this.props.path || ''
    };

    ipc.on('open-dir-dialog-reply', function(dirPath) {
      if(dirPath){
        props.onSetPath(dirPath[0]);
      }
    });
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

  handleDialog(){
    ipc.send('open-dir-dialog');
  }

  handleBack(){
    this.props.onBack();
  }

  render() {
    const { onSetPath } = this.props;
    return (
      <div className="DirectoryBar">
        <button className="BackButton" onClick={this.handleBack.bind(this)}>-</button>
        <button className="DialogButton" onClick={this.handleDialog}>...</button>
        <input type="text" value={this.state.path} onChange={this.handleChange.bind(this)} onKeyDown={this.handleEnter.bind(this)} placeholder="Select a directory"/>
        <button className="OkButton" onClick={this.handleClick.bind(this)}>Go</button>
      </div>
    );
  }
}

DirectoryBar.propTypes = {
  path: PropTypes.string.isRequired,
  onSetPath: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};


export default DirectoryBar;
