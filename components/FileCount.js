import React, { PropTypes, Component } from 'react';

class FileCount extends Component {

  render() {
    const { count } = this.props;
    return (
      <span className="FileCount">
        Found: <b>{count}</b> {count === 1 ? 'File' : 'Files'}
      </span>
    );
  }
}

FileCount.propTypes = {
  count: PropTypes.number.isRequired
};


export default FileCount;
