import React, { PropTypes, Component } from 'react';
var pathNpm = electronRequire('path');

class FileItem extends Component {

  handleClick(path) {
    this.props.onSetPath(path);
  }

  render() {
    const { size, relativeSize, path, onSetPath } = this.props;
    const style = {width: relativeSize + '%'};
    return (
      <tr className="FileItem" onClick={this.handleClick.bind(this, path)}>
        <td className="FileType">
          <div>{pathNpm.extname(path)}</div>
        </td>
        <td className="FileName">{pathNpm.basename(path)}</td>
        <td className="FileSizeBar">
          <div>
            <div style={style}>
              <span className="FileSize">{size}</span>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

FileItem.propTypes = {
  path: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  relativeSize: PropTypes.number.isRequired,
  onSetPath: PropTypes.func.isRequired
};


export default FileItem;
