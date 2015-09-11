import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import DirectoryBar from '../components/DirectoryBar';
import FileItem from '../components/FileItem';

class App extends Component {

  render() {
    const { path, content, dispatch } = this.props;
    const actions = bindActionCreators(Actions, dispatch);

    return (
      <div>
        <DirectoryBar path={path} onSetPath={actions.setPath}/>
        {path}
        <ul>{content.map(file => <FileItem path={file.path} size={file.size} onSetPath={actions.setPath} key={file.path} />)}</ul>
      </div>
    );
  }
}

App.propTypes = {
  path: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function transformState(state) {
  return {
    path: state.directory.path,
    content: state.directory.content
  };
}

export default connect(transformState)(App);
