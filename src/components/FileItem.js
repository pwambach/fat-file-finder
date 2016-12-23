import React, { PropTypes, Component } from 'react';
import PureComponent from 'react-pure-render/component';
import FileIcon from './FileIcon';
var pathNpm = electronRequire('path');

class FileItem extends PureComponent {

  handleDirectoryClick(path, e) {
    e.preventDefault();
    this.props.onSetPath(path);
  }

  render() {
    const { size, relativeSize, path, onSetPath } = this.props;
    const style = {width: relativeSize + '%'};
    return (
      <tr className="FileItem">
        <td className="FileIcon">
          <FileIcon type={pathNpm.extname(path)} path={path}/>
        </td>
        <td className="FileName">
          {pathNpm.basename(path)}
          <div className="DirectoryName"
               onClick={this.handleDirectoryClick.bind(this, pathNpm.dirname(path))}>
            {pathNpm.dirname(path)}
          </div>
        </td>
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
