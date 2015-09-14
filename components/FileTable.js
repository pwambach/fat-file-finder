import React, { PropTypes, Component } from 'react';
import FileItem from '../components/FileItem';
var filesize = require('filesize');

class FileTable extends Component {

  render() {
    const { files, actions } = this.props;
    return (
      <table className="FileList">
      <thead>
        <tr>
          <td>Type</td>
          <td>Name</td>
          <td>Size</td>
        </tr>
      </thead>
      <tbody>
        {files.map(file => {
          var relativeSize = Math.floor((file.size/files[0].size)*100);
          if(relativeSize < 1) {
            relativeSize = 1;
          }
          return (
            <FileItem path={file.path}
                      size={filesize(file.size, {round: 0})}
                      relativeSize={relativeSize}
                      onSetPath={actions.updateTree}
                      key={file.path} />
          )})
        }
      </tbody>
      </table>
    );
  }
}

FileTable.propTypes = {
  files: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};


export default FileTable;
