import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import DirectoryBar from '../components/DirectoryBar';
import SliderInput from '../components/SliderInput';
import FileCount from '../components/FileCount';
import FileTable from '../components/FileTable';




class App extends Component {

  render() {
    const { path, files, minSize, dispatch } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    const filteredFiles = files.filter( (file, index) => file.size > minSize && index < 100);

    return (
      <div>
        <DirectoryBar path={path} onSetPath={actions.updateTree} onBack={actions.rewindTree}/>

        <div className="Additional">
          <SliderInput onUpdate={actions.setMinSize} value={minSize}/>
          <FileCount count={files.length}/>
          <span className="ShowingFileCount"> (Showing: {filteredFiles.length})</span>
        </div>

        <FileTable files={filteredFiles} actions={actions}/>
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
