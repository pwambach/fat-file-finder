import React, { PropTypes, Component } from 'react';
var path = require('path');

class FileItem extends Component {

  handleClick(path) {
    this.props.onSetPath(path);
  }

  render() {
    const { onSetPath } = this.props;
    return (
      <li className="FileItem" onClick={this.handleClick.bind(this, this.props.path)}>
        <span className="FileName">{path.basename(this.props.path)}</span>
        <span className="FileSize">{this.props.size}</span>
      </li>
    );
  }
}

FileItem.propTypes = {
  path: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onSetPath: PropTypes.func.isRequired
};


export default FileItem;
