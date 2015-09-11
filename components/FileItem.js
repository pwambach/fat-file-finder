import React, { PropTypes, Component } from 'react';

class FileItem extends Component {

  handleClick(path) {
    this.props.onSetPath(path);
  }

  render() {
    const { onSetPath } = this.props;
    return <li onClick={this.handleClick.bind(this, this.props.path)}>{this.props.path} {this.props.size}</li>;
  }
}

FileItem.propTypes = {
  path: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  onSetPath: PropTypes.func.isRequired
};


export default FileItem;
