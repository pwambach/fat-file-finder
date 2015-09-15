import React, { PropTypes, Component } from 'react';
import { emitter } from '../emitters/emitter';


class FileCount extends Component {

  constructor() {
    super(arguments);
    this.state = {};
    emitter.addListener('updateLoadedFiles', (count) => this.setState({ count: count }));
  }

  render() {
    const { count, loading, loadedFiles } = this.props;
    return (
      <span className="FileCount">Found: <b>{ !loading ? count : this.state.count } </b> {count === 1 ? 'File' : 'Files'}</span>
    );
  }
}

FileCount.propTypes = {
  count: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  loadedFiles: PropTypes.number.isRequired
};


export default FileCount;
