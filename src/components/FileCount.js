import React, { PropTypes, Component } from 'react';
import PureComponent from 'react-pure-render/component';

class FileCount extends PureComponent {

  render() {
    const { count, loading, loadedFiles } = this.props;
    return (
      <span className="FileCount">Found: <b>{ !loading ? count : loadedFiles } </b> {count === 1 ? 'File' : 'Files'}</span>
    );
  }
}

FileCount.propTypes = {
  count: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  loadedFiles: PropTypes.number.isRequired
};


export default FileCount;
