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
    const { onSetPath, loading } = this.props;
    return (
      <div className="DirectoryBar">
        <button className="BackButton" onClick={this.handleBack.bind(this)}><i className="fa fa-arrow-left"></i></button>
        <button className="DialogButton" onClick={this.handleDialog}><i className="fa fa-search"></i></button>
        <input type="text" value={this.state.path} onChange={this.handleChange.bind(this)} onKeyDown={this.handleEnter.bind(this)} placeholder="Select a directory"/>
        <button className="OkButton" onClick={this.handleClick.bind(this)}>
          {loading ? (<i className="fa fa-cog fa-spin"></i>) : (<i className="fa fa-arrow-right"></i>)}
        </button>
      </div>
    );
  }
}

DirectoryBar.propTypes = {
  onSetPath: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};


export default DirectoryBar;
