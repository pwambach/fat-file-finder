import React, { PropTypes, Component } from 'react';
import PureComponent from 'react-pure-render/component';
import fileIconMap from '../constants/FileIconMapping';
import {ipcRenderer} from  'electron';

class FileIcon extends PureComponent {


  openFinder(path){
    ipcRenderer.send('open-finder', {path});
  }

  render() {
    const { type, path } = this.props;
    const iconClassName = 'fa '.concat(fileIconMap[type] || 'fa-file-o');

    return (
      <div onClick={this.openFinder.bind(this, path)}>
        <i className={iconClassName}></i>
      </div>
    );
  }

}

FileIcon.propTypes = {
  type: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

export default FileIcon;
