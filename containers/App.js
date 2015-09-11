import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import DirectoryBar from '../components/DirectoryBar';
import FileItem from '../components/FileItem';
import SliderInput from '../components/SliderInput';

var filesize = require('filesize');

class App extends Component {

  render() {
    const { path, files, minSize, dispatch } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    const filteredFiles = files.filter(file => file.size > minSize);

    return (
      <div>
        <DirectoryBar path={path} onSetPath={actions.updateTree} />

        <div className="FileCount">{filteredFiles.length} Files</div>

        <SliderInput onUpdate={actions.setMinSize} value={minSize}/>MB

        <ul className="FileList">
          {filteredFiles.map(file => <FileItem path={file.path} size={filesize(file.size)} onSetPath={actions.updateTree} key={file.path} />)}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  path: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function transformState(state) {
  return {
    path: state.directory.path,
    files: state.directory.files,
    minSize: state.directory.minSize
  };
}

export default connect(transformState)(App);
